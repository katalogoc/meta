const createSequelizeClient = require('./sequelize');

module.exports = ({ config, logger }) => {
  const sequelize = createSequelizeClient({ logger, config, basePath: __dirname });

  return {
    sequelize,
    async authenticate() {
      return Promise.all([sequelize.authenticate()]);
    },
    async close() {
      await Promise.all([sequelize.connection.close()]);
    },
  };
};
