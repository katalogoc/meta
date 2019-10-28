import { DgraphClient, Mutation, Request, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import { getById } from './getById';
import { blankNodeId } from '../common/util';
import { SaveTextInput, Text } from '../common/types';

const logger = createLogger();

export async function upsert(client: DgraphClient, text: SaveTextInput): Promise<string> {
  const { title, url, subject, authors } = text;

  const mutation = new Mutation();

  const fromDb: Text | null = text.id ? await getById(client, text.id).catch(() => null) : null;

  const blankNodeName = 'text';

  const uid: string = fromDb ? (fromDb.id as string) : blankNodeId(blankNodeName);

  const authorObjects = authors.map((authorUid: string) => ({
    uid,
    authors: {
      uid: authorUid,
    },
  }));

  mutation.setSetJson([
    {
      uid,
      title,
      url,
      subject,
      ['dgraph.type']: 'Text',
    },
    ...authorObjects,
  ]);

  const req = new Request();

  req.setMutationsList([mutation]);

  const txn = client.newTxn();

  try {
    const res = await txn.doRequest(req);

    await txn.commit();

    return fromDb ? fromDb.id : (res.getUidsMap().get(blankNodeName) as string);
  } catch (err) {
    if (err === ERR_ABORTED) {
      return upsert(client, text);
    } else {
      logger.error(`Couldn't upsert a text, error: ${err}`);

      throw err;
    }
  } finally {
    await txn.discard();
  }
}
