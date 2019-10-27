import { DgraphClient, Mutation, Request } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { blankNodeId } from '../common/util';
import { SaveAuthorInput, Author, Text } from '../common/types';

const logger = createLogger();

export async function upsert(client: DgraphClient, author: SaveAuthorInput): Promise<Author> {
  const { name, alias, birthdate, deathdate, thumbnail, texts: textIds } = author;

  const mutation = new Mutation();

  const temporaryId = author.id || '0x01';

  const req = new Request();

  const query = `
    query {
        author as var(func: uid("${temporaryId}"))
    }
  `;

  req.setQuery(query);

  const matchedNode = 'uid(author)';

  const aliasObjects = alias.map((value: string) => ({
    uid: matchedNode,
    alias: {
      value,
      uid: blankNodeId(value),
      ['dgraph.type']: 'Alias',
    },
  }));

  const texts: Text[] = [];

  mutation.setSetJson([
    {
      uid: matchedNode,
      name,
      birthdate,
      deathdate,
      thumbnail,
      texts,
      ['dgraph.type']: 'Author',
    },
    ...aliasObjects,
  ]);

  mutation.setCond(`@if(eq(len(author), 1))`);

  req.setMutationsList([mutation]);

  req.setCommitNow(true);

  try {
    const res = await client.newTxn().doRequest(req);

    const id = res.getUidsMap().get(matchedNode) as string;

    console.log(res.getUidsMap().keys());
    return {
      id: temporaryId,
      name,
      birthdate,
      deathdate,
      thumbnail,
      texts,
      alias,
    };
  } catch (err) {
    logger.error(`Couldn't upsert an author, error: ${err}`);

    throw err;
  }
}
