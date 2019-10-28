import { DgraphClient, Mutation, Request, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { blankNodeId } from '../common/util';
import { getById } from './getById';
import { SaveAuthorInput, Author, Text } from '../common/types';

const logger = createLogger();

export async function upsert(client: DgraphClient, author: SaveAuthorInput): Promise<Author> {
  const { name, alias, birthdate, deathdate, thumbnail, texts: textIds } = author;

  const mutation = new Mutation();

  const fromDb: Author | null = author.id ? await getById(client, author.id).catch(() => null) : null;

  const blankNodeName = 'author';

  const uid: string = fromDb ? (fromDb.id as string) : blankNodeId(blankNodeName);

  const req = new Request();

  const aliasObjects = alias.map((value: string) => ({
    uid,
    alias: {
      value,
      uid: blankNodeId(value),
      ['dgraph.type']: 'Alias',
    },
  }));

  const texts: Text[] = [];

  mutation.setSetJson([
    {
      uid,
      name,
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

    const temporaryId = fromDb ? (fromDb.id as string) : blankNodeName;

    const id = res.getUidsMap().get(temporaryId) as string;

    await txn.commit();

    return {
      id,
      name,
      birthdate,
      deathdate,
      thumbnail,
      texts,
      alias,
    };
  } catch (err) {
    if (err === ERR_ABORTED) {
      return upsert(client, author);
    } else {
      logger.error(`Couldn't upsert an author, error: ${err}`);

      throw err;
    }
  }
}
