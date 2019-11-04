import { DgraphClient, Mutation, Request, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import { blankNodeId } from '../common/util';
import { getById } from './getById';
import { SaveAuthorInput, Author, Text } from '../common/types';

const logger = createLogger();

export async function upsert(client: DgraphClient, author: SaveAuthorInput): Promise<string> {
  const { name, alias, birthdate, deathdate, thumbnail, texts: textIds } = author;

  const mutation = new Mutation();

  const fromDb: Author | null = author.id ? await getById(client, author.id).catch(() => null) : null;

  const blankNodeName = 'author';

  const uid: string = fromDb ? (fromDb.id as string) : blankNodeId(blankNodeName);

  const req = new Request();

  const texts: Text[] = [];

  const aliasObjects = alias.map((alias: string) => ({
    uid,
    alias,
  }));

  mutation.setSetJson([
    {
      uid,
      name,
      alias,
      birthdate,
      deathdate,
      thumbnail,
      texts,
      ['dgraph.type']: 'Author',
    },
    ...aliasObjects,
  ]);

  req.setMutationsList([mutation]);

  const txn = client.newTxn();

  try {
    const res = await txn.doRequest(req);

    await txn.commit();

    return fromDb ? (fromDb.id as string) : (res.getUidsMap().get(blankNodeName) as string);
  } catch (err) {
    if (err === ERR_ABORTED) {
      return upsert(client, author);
    } else {
      logger.error(`Couldn't upsert an author, error: ${err}`);

      throw err;
    }
  } finally {
    await txn.discard();
  }
}
