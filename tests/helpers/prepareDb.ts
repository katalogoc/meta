import createLogger from 'hyped-logger';
import { init, createClient } from '../../src/common/db';

const logger = createLogger();

const client = createClient();

const promise = init(client).catch((err: Error) => {
  logger.error(`Couldn't alter the schema for the test environment, error: ${err}`);
});

export async function prepareDb() {
  return promise;
}
