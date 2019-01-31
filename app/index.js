const config = require('config');
const { createContainer, asFunction, asValue } = require('awilix');
const httpServer = require('infra/server');
const apollo = require('infra/graphql');
const logger = require('hyped-logger');
const database = require('infra/db');

const container = createContainer();

// Inject dependencies!
container.register({
  server: asFunction(httpServer).singleton(),
  apollo: asFunction(apollo).singleton(),
  config: asValue(config),
  logger: asFunction(logger).singleton(),
  database: asFunction(database).singleton(),
});

module.exports = {
  get(module) {
    return container.resolve(module);
  },
  start() {
    const db = this.get('database');

    const server = this.get('server');

    return Promise.resolve()
      .then(db.authenticate)
      .then(server.start);
  },
};
