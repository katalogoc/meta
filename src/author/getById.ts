import { DgraphClient } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { Author } from '../common/types';
import { makeAuthor } from './makeAuthor';

const logger = createLogger();

export async function getById(client: DgraphClient, uid: string): Promise<Author | null> {
  const query = `
      query getAuthor($id: string) {
          author(func: uid($id)) {
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
    const res = await txn.queryWithVars(query, {
      $id: uid,
    });

    const json = res.getJson();

    if (json.author && json.author.length) {
      return makeAuthor(json.author[0]);
    }
    return null;
  } catch (err) {
    logger.error(`Couldn't get an author with uid: ${uid}, error: ${err}`);

    throw err;
  }
}
