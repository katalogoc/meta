import { DgraphClient, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import { Author } from '../common/types';
import { makeAuthor } from './makeAuthor';

const logger = createLogger();

export async function getById(client: DgraphClient, uid: string): Promise<Author | null> {
  const query = `
    query getAuthor($id: string) {
      author(func: uid($id)) @filter(type(Author)) {
        uid
        xid
        source
        name
        thumbnail
        birthdate
        deathdate
        alias
        texts: ~authors {
          uid
          xid
          source
          title
          url
          subject
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

    if (json.author && json.author.length) {
      return makeAuthor(json.author[0]);
    }

    return null;
  } catch (err) {
    if (err === ERR_ABORTED) {
      return getById(client, uid);
    } else {
      logger.error(`Couldn't get an author with uid: ${uid}, error: ${err}`);

      throw err;
    }
  } finally {
    await txn.discard();
  }
}
