import { DgraphClient, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import { Text } from '../common/types';
import { makeText } from './makeText';

const logger = createLogger();

export async function getById(client: DgraphClient, uid: string): Promise<Text | null> {
  const query = `
    query getText($id: string) {
      text(func: uid($id)) {
        uid
        title
        url
        subject
        authors {
          uid
          name
          alias
          deathdate
          birthdate
          thumbnail
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

    await txn.commit();

    if (json.text && json.text.length) {
      return makeText(json.text[0]);
    }

    return null;
  } catch (err) {
    if (err === ERR_ABORTED) {
      return getById(client, uid);
    } else {
      logger.error(`Couldn't get a text with uid: ${uid}, error: ${err}`);

      throw err;
    }
  } finally {
    await txn.discard();
  }
}
