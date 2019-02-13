import config from '../../config';
import parseDbUrl from 'parse-database-url';

const { user: username, password, database, host, port, driver } = parseDbUrl(config.get('DATABASE_URL') || 'postgres://localhost:5433');

const cfg = {
  password,
  database,
  host,
  port,
  username,
  dialect: driver,
  dialectOptions: {
    ssl: true,
  },
};

export default {
  test: cfg,
  development: cfg,
  production: cfg,
};
