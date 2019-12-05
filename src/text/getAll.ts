import { DgraphClient, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import { Text, QueryOptions } from '../common/types';
import { makeText } from './makeText';
import { TextNode } from './types';

const logger = createLogger();

export async function getAll(client: DgraphClient, queryOptions: QueryOptions): Promise<Text[]> {
  const query = `
    query getTexts {
      texts(func: type(Text)) {
        uid
        xid
        source
        title
        url
        subject
        authors {
          uid
          xid
          source
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
    const res = await txn.query(query);

    const json = res.getJson();

    await txn.commit();

    return json.texts.map((node: TextNode) => makeText(node));
  } catch (err) {
    if (err === ERR_ABORTED) {
      return getAll(client, queryOptions);
    } else {
      logger.error(`Couldn't get texts, error: ${err}`);

      throw err;
    }
  } finally {
    await txn.discard();
  }
}
