import { DgraphClient, Mutation } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { byUid } from './getText';
import { Text } from '../../types';

const logger = createLogger();

export async function upsertText(client: DgraphClient, text: Text): Promise<Text> {
  const txn = client.newTxn();

  let uid = null;

  try {
    const fromDatabase = text.id ? await byUid(client, text.id) : null;

    const mutation = new Mutation();

    mutation.setSetJson({
      uid: `_:${fromDatabase ? fromDatabase.id : text.url}`,
      ...text,
    });

    const res = await txn.mutate(mutation);

    const object: any = res.toObject();

    uid = _.get(object, 'uidsMap.0.0');

    return {
      id: uid,
      title: object.title || 'null',
      url: object.url || 'null',
      authors: [],
      subject: [],
    };
  } catch (err) {
    logger.error(`Couldn't upsert a text, error: ${err}`);

    throw err;
  }
}
