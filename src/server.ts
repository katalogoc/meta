import Koa from 'koa';
import http, { Server } from 'http';
import config from './config';
import createLogger from 'hyped-logger';
import apollo from './apollo';

const logger = createLogger();

const host = config.get('HOST');

const port = config.get('PORT');

export default async (app: Koa) => {
  const server: Server = http.createServer(app.callback()).listen(port, host, () => {
    const address: any = server.address();

    const { address: hostName, port: adressPort } = address;

    const hostPort = `http://${hostName}:${adressPort}`;

    logger.info(`Listening on ${adressPort}`);

    logger.info(`GraphQL endpoint: ${hostPort}${apollo.graphqlPath}`);

    if (process.send) {
      process.send('ready');
    }

    process.on('message', (msg: string) => {
      if (msg === 'shutdown') {
        logger.info('Closing all connections...');

        process.nextTick(() => {
          logger.info('Finished closing connections');
          process.exit(0);
        }, 1500);
      }
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT signal received.');

      server.close(async (err: Error) => {
        if (err) {
          logger.error(err);
          process.exit(1);
        }
      });
    });
  });
};
