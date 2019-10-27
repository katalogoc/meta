import Koa from 'koa';
import apollo from './apollo';
import createLogger from 'hyped-logger';
import loggerWinston from 'koa-logger-winston';
import bodyParser from 'koa-bodyparser';
import handleErrors from './common/handleErrors';

const logger = createLogger();

const middlewares = [
  loggerWinston(logger),
  bodyParser(),
  handleErrors,
];

const app = new Koa();

for (const middleware of middlewares) {
  app.use(middleware);
}

app.on('error', (err: Error) => {
  logger.error(err);
});

apollo.applyMiddleware({ app, path: '/api' });

export default app;
