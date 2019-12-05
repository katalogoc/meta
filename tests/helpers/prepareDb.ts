import createLogger from 'hyped-logger';
import { init, createClient, dropGraphAndSchema } from '../../src/common/db';

const logger = createLogger();

const client = createClient();

const promise = Promise.resolve(client).then(() =>
  init(client).catch((err: Error) => {
    logger.error(`Couldn't alter the schema for the test environment, error: ${err}`);
  })
);

export async function prepareDb() {
  return promise;
}
