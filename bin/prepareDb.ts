
import tryToCatch from 'try-to-catch';
import { init, createClient, dropGraphAndSchema } from '../src/common/db';

const client = createClient();

(async () => {
  const [dropFailedError] = await tryToCatch(dropGraphAndSchema, client);

  if (dropFailedError) {
    process.exit(1);
  }

  const [initFailedError] = await tryToCatch(init, client);

  if (initFailedError) {
    process.exit(1);
  }
})();
