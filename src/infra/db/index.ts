import { sequelize, authenticate } from './sequelize';

export default {
  sequelize,
  async authenticate() {
    return Promise.all([authenticate()]);
  },
  async close() {
    await Promise.all([sequelize.connectionManager.close()]);
  },
};
