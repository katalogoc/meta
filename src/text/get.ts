import { DgraphClient } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { Text } from '../common/types';

const logger = createLogger();

export async function byUid(client: DgraphClient, uid: string): Promise<Text> {
  const query = `
      query getText($id: string) {
          text(func: uid($id)) {
              uid
              title
              url
              authors {
                  name
              }
              subject
          }
      }
  `;

  const txn = client.newTxn();

  try {
    const res = await txn.queryWithVars(query, {
      $id: uid,
    });

    const json = res.getJson() || null;

    await txn.commit();

    return (
      json && {
        id: uid,
        title: json.title || null,
        url: json.url || null,
        authors: [],
        subject: [],
      }
    );
  } catch (err) {
    logger.error(`Couldn't get a text with uid: ${uid}, error: ${err}`);

    throw err;
  } finally {
    await txn.discard();
  }
}
