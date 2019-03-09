import Koa from 'koa';
import apollo from './apollo';
import middlewares from './middlewares';
import createLogger from 'hyped-logger';

const logger = createLogger();

const app = new Koa();

for (const middleware of middlewares) {
  app.use(middleware);
}

app.on('error', (err: Error) => {
  logger.error(err);
});

apollo.applyMiddleware({ app, path: '/api' });

export default app;
