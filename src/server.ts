import Koa from 'koa';
import http, { Server } from 'http';
import config from './config';
import createLogger from 'hyped-logger';
import { createClient, init as initDb } from './common/db';

const logger = createLogger();

export default async (app: Koa) => {
  await initDb(createClient());

  const server: Server = http.createServer(app.callback()).listen(config.get('PORT'), config.get('HOST'), () => {
    const { address, port } = server.address() as any;

    logger.info(`meta service started, go to http://${address}:${port}/api`);

    process.on('SIGINT', () => {
      logger.info('SIGINT signal received.');

      server.close(
        (): void => {
          process.exit(0);
        }
      );
    });
  });
};
