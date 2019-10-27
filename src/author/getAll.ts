import { DgraphClient } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { Author, QueryOptions } from '../common/types';
import { makeAuthor } from './makeAuthor';
import { AuthorNode } from './types';

const logger = createLogger();

export async function getAll(client: DgraphClient, queryOptions: QueryOptions): Promise<Author[]> {
  const query = `
      query getAuthors {
          authors(func: type(Author)) {
              uid
              name
              thumbnail
              birthdate
              deathdate
              alias {
                value
              }
              texts {
                uid
              }
          }
      }
  `;

  const txn = client.newTxn();

  try {
    const res = await txn.query(query);

    const json = res.getJson();

    if (json.authors && json.authors.length) {
      return json.authors.map((node: AuthorNode) => makeAuthor(node));
    }
    return [];
  } catch (err) {
    logger.error(`Couldn't get authors, error: ${err}`);

    throw err;
  }
}
