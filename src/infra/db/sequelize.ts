import { Sequelize } from 'sequelize-typescript';
import hypedLogger from 'hyped-logger';
import config from '../../config';

const URL = config.get('DATABASE_URL');

const logger = hypedLogger();

export const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432,
  database: 'meta',
  username: 'shonie',
  password: 'JohnColtrane666',
  dialect: 'postgres',
  logging: logger.info,
  modelPaths: [__dirname + './models'],
});

export const authenticate = () =>
  sequelize
    .sync()
    .then(() => {
      logger.info(`PostgreSQL connection established: ${URL}`);
    })
    .catch((err: Error) => {
      logger.error(`PostgreSQL connection error: ${err}`);
      throw err;
    })
    .then(() => sequelize.sync())
    .catch((err: Error) => {
      logger.error(`PostgreSQL failed to create tables: ${err}`);
    });
