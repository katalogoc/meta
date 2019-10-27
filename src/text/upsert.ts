import { DgraphClient, Mutation, Request } from 'dgraph-js';
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
    'dgraph.type': 'Text',
  });

  const req = new Request();

  req.setMutationsList([mutation]);

  req.setCommitNow(true);

  try {
    const res = await client.newTxn().doRequest(req);

    const id = res.getUidsMap().get(temporaryId) as string;

    return {
      id,
      title,
      url,
      subject,
      authors: [],
    };
  } catch (err) {
    logger.error(`Couldn't upsert a text, error: ${err}`);

    throw err;
  }
}
