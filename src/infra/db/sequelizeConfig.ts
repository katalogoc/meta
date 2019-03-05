import config from '../../config';

export const sequelizeConfig = {
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  database: config.get('DB_DATABASE'),
  username: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  dialect: config.get('DB_DIALECT'),
  modelPaths: [__dirname + '/models/**/*.ts'],
  // logging: logger.info,
};

export default {
  test: sequelizeConfig,
  development: sequelizeConfig,
  production: sequelizeConfig,
};
