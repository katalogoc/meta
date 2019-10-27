import { DgraphClient } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { Author } from '../common/types';

const logger = createLogger();

export async function get(client: DgraphClient, uid: string): Promise<Author | null> {
  const query = `
      query getAuthor($id: string) {
          author(func: uid($id)) {
              uid
              name
              aliases {
                alias
              }
              thumbnail
              birthdate
              deathdate
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
      const [{ uid: id, name, birthdate, deathdate, alias, thumbnail, texts }] = json.author;

      return {
        id,
        name: name || null,
        birthdate: birthdate || null,
        deathdate: deathdate || null,
        aliases: alias ? [alias] : [],
        thumbnail: thumbnail || null,
        texts: texts || [],
      };
    }
    return null;
  } catch (err) {
    logger.error(`Couldn't get an author with uid: ${uid}, error: ${err}`);

    throw err;
  }
}
