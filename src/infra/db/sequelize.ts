import { Sequelize } from 'sequelize-typescript';
import hypedLogger from 'hyped-logger';

const logger = hypedLogger();

export const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432,
  database: 'meta',
  username: 'shonie',
  password: 'JohnColtrane666',
  dialect: 'postgres',
  logging: logger.info,
  modelPaths: [__dirname + '/models/**/*.ts'],
});

export const authenticate = () =>
  sequelize
    .authenticate()
    .then(() => {
      logger.info(`PostgreSQL connection established!`);
    })
    .catch((err: Error) => {
      logger.error(`PostgreSQL connection error: ${logger.deep(err)}`);
      throw err;
    })
    .then(() => sequelize.sync({ alter: process.env.NODE !== 'production' }))
    .catch((err: Error) => {
      logger.deep(`PostgreSQL failed to create tables: ${err}`);
    });
