import { DgraphClient, Mutation, Request } from 'dgraph-js';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import { blankNodeId } from '../../util';
import { Text } from '../../types';

const logger = createLogger();

export async function upsertText(client: DgraphClient, { title, url, subject, ...text }: Text): Promise<Text> {
  const mutation = new Mutation();

  const temporaryId = text.id || title || url;

  const uid = blankNodeId(temporaryId);

  const subjectObjects = subject.map((s: string) => ({
    uid: blankNodeId(s),
  }));

  mutation.setSetJson({
    uid,
    title,
    url,
    'subject': subjectObjects,
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
