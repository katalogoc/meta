import { init, createClient, dropGraphAndSchema } from '../../src/common/db';

let initialized = false;

export async function prepareDb() {
  if (!initialized) {
    const client = createClient();

    await dropGraphAndSchema(client);

    await init(client);
  }

  initialized = true;
}
