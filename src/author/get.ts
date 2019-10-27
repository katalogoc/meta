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
      const [
        { uid: id, name = null, birthdate = null, deathdate = null, alias = [], thumbnail = null, texts = [] },
      ] = json.author;

      return {
        id,
        name,
        birthdate,
        deathdate,
        thumbnail,
        texts,
        aliases: alias.map((a: { value: string }) => a.value),
      };
    }
    return null;
  } catch (err) {
    logger.error(`Couldn't get an author with uid: ${uid}, error: ${err}`);

    throw err;
  }
}
