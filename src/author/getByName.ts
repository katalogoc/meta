import { DgraphClient, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import { Author } from '../common/types';
import { makeAuthor } from './makeAuthor';

const logger = createLogger();

export async function getByName(client: DgraphClient, name: string): Promise<Author | null> {
  const query = `
    query getAuthor($name: string) {
      author(func: type(Author)) @filter(eq(name, $name) or allofterms(alias, $name)) {
        uid
        name
        thumbnail
        birthdate
        deathdate
        alias
        texts: ~authors {
          uid
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
      $name: name,
    });

    const json = res.getJson();

    await txn.commit();

    if (json.author && json.author.length) {
      return makeAuthor(json.author[0]);
    }

    return null;
  } catch (err) {
    if (err === ERR_ABORTED) {
      return getByName(client, name);
    } else {
      logger.error(`Couldn't get an author with name: ${name}, error: ${err}`);

      throw err;
    }
  } finally {
    await txn.discard();
  }
}
