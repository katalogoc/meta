import { DgraphClient, Mutation, Request, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import { blankNodeId } from '../common/util';
import { getById } from './getById';
import { SaveAuthorInput, Author } from '../common/types';

const logger = createLogger();

export async function upsert(client: DgraphClient, author: SaveAuthorInput): Promise<string> {
  const { name, alias, birthdate, deathdate, thumbnail, xid = null, source = null, texts: textIds = [] } = author;

  const mutation = new Mutation();

  const fromDb: Author | null = author.id ? await getById(client, author.id).catch(() => null) : null;

  const blankNodeName = 'author';

  const uid: string = fromDb ? (fromDb.id as string) : blankNodeId(blankNodeName);

  const req = new Request();

  const aliasObjects = alias.map((a: string) => ({
    uid,
    alias: a,
  }));

  const texts = textIds.map((textId: string) => ({
    uid,
    texts: {
      uid: textId,
    },
  }));

  mutation.setSetJson([
    {
      uid,
      xid,
      source,
      name,
      alias,
      birthdate,
      deathdate,
      thumbnail,
      ['dgraph.type']: 'Author',
    },
    ...aliasObjects,
    ...texts,
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
