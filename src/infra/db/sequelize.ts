import { Sequelize } from 'sequelize-typescript';
import hypedLogger from 'hyped-logger';
import config from '../../config';

const logger = hypedLogger();

const sequelizeConfig = {
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  database: config.get('DB_DATABASE'),
  username: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  dialect: config.get('DB_DIALECT'),
  modelPaths: [__dirname + '/models/**/*.ts'],
  // logging: logger.info,
};

export const sequelize = new Sequelize(sequelizeConfig);

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
