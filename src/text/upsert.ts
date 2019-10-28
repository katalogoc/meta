import { DgraphClient, Mutation, Request, ERR_ABORTED } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { blankNodeId } from '../common/util';
import { SaveTextInput, Text } from '../common/types';

const logger = createLogger();

export async function upsert(client: DgraphClient, text: SaveTextInput): Promise<Text> {
  const { title, url, subject, authors } = text;

  const mutation = new Mutation();

  const temporaryId = text.id || title || url;

  const uid = blankNodeId(temporaryId);

  const subjectObjects = subject.map((s: string) => ({
    uid: blankNodeId(s),
  }));

  const authorObjects = authors.map((a: any) => ({
    uid: blankNodeId(a.id || a.name),
    name: a.name,
    birthdate: a.birthdate,
    deathdate: a.deathdate,
    thumbnail: a.thumbnail,
  }));

  mutation.setSetJson({
    uid,
    title,
    url,
    authors: authorObjects,
    subject: subjectObjects,
    ['dgraph.type']: 'Text',
  });

  const req = new Request();

  req.setMutationsList([mutation]);

  const txn = client.newTxn();

  try {
    const res = await txn.doRequest(req);

    const id = res.getUidsMap().get(temporaryId) as string;

    await txn.commit();

    return {
      id,
      title,
      url,
      subject,
      authors: [],
    };
  } catch (err) {
    if (err === ERR_ABORTED) {
      return upsert(client, text);
    } else {
      logger.error(`Couldn't upsert a text, error: ${err}`);

      throw err;
    }
  }
}
