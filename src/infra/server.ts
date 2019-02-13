import Koa from 'koa';
import loggerWinston from 'koa-logger-winston';
import http from 'http';
import bodyParser from 'koa-bodyparser';
import config from '../config';
import createLogger from 'hyped-logger';
import apollo from './graphql';
import database from './db';

const logger = createLogger();

const host = config.get('HOST');

const port = config.get('PORT');

const app = new Koa()
  .use(loggerWinston(logger))
  .use(bodyParser())
  .on('error', (err: Error) => {
    logger.error(err);
  });

apollo.applyMiddleware({ app, path: '/api' });

export default {
  app,
  start: (): Promise<void> =>
    new Promise(resolve => {
      const server = http.createServer(app.callback()).listen(port, host, () => {
        // `this` refers to the http server here
        const { address, port: adressPort } = server.address() as any;

        const hostPort = `http://${address}:${adressPort}`;

        logger.info(`Listening on ${hostPort}...`);

        logger.info(`GraphQL endpoint: ${hostPort}${apollo.graphqlPath}`);

        if (process.send) {
          // notify master about readiness
          process.send('ready');
        }

        process.on('message', msg => {
          if (msg === 'shutdown') {
            logger.info('Closing all connections...');
            setTimeout(() => {
              logger.info('Finished closing connections');
              process.exit(0);
            }, 1500);
          }
        });

        process.on('SIGINT', async () => {
          logger.info('SIGINT signal received.');

          // Stops the server from accepting new connections and finishes existing connections.
          server.close(async (err: Error) => {
            // if error, log and exit with error (1 code)
            if (err) {
              logger.error(err);
              process.exit(1);
            }

            logger.info('Closing database connections...');
            // close database connection and exit with success (0 code)
            await database.close();

            process.exit(0);
          });
        });
        resolve();
      });
    }),
};
