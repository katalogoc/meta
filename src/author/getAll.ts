import { DgraphClient, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import { Author, QueryOptions } from '../common/types';
import { makeAuthor } from './makeAuthor';
import { AuthorNode } from './types';

const logger = createLogger();

export async function getAll(client: DgraphClient, queryOptions: QueryOptions): Promise<Author[]> {
  const query = `
    query getAuthors {
      authors(func: type(Author)) {
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
    const res = await txn.query(query);

    const json = res.getJson();

    await txn.commit();

    return json.authors.map((node: AuthorNode) => makeAuthor(node));
  } catch (err) {
    if (err === ERR_ABORTED) {
      return getAll(client, queryOptions);
    } else {
      logger.error(`Couldn't get authors, error: ${err}`);

      throw err;
    }
  } finally {
    await txn.discard();
  }
}
