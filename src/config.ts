require('dotenv').config();
import nconf from 'nconf';

const defaults = {
  HOST: '0.0.0.0',
  PORT: 8082,
  DGRAPH_HOST: 'localhost',
  DGRAPH_PORT: 9080,
  DGRAPH_DEBUG_MODE: false,
};

const config = nconf
  .env()
  .argv()
  .defaults(defaults);

export default config;
