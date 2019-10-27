import { DgraphClient, Mutation, Request } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { blankNodeId } from '../common/util';
import { SaveAuthorInput, Author, Text } from '../common/types';

const logger = createLogger();

export async function upsert(client: DgraphClient, author: SaveAuthorInput): Promise<Author> {
  const { name, aliases, birthdate, deathdate, thumbnail, texts: textIds } = author;

  const mutation = new Mutation();

  const temporaryId = author.id || (name as string);

  const uid = blankNodeId(temporaryId);

  const aliasObjects = aliases.map((alias: string) => ({
    uid,
    alias,
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
      'dgraph.type': 'Author',
    },
    ...aliasObjects,
  ]);

  const req = new Request();

  req.setMutationsList([mutation]);

  req.setCommitNow(true);

  try {
    const res = await client.newTxn().doRequest(req);

    const id = res.getUidsMap().get(temporaryId) as string;

    return {
      id,
      name,
      birthdate,
      deathdate,
      thumbnail,
      texts,
      aliases,
    };
  } catch (err) {
    logger.error(`Couldn't upsert a text, error: ${err}`);

    throw err;
  }
}
