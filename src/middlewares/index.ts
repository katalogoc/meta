import loggerWinston from 'koa-logger-winston';
import bodyParser from 'koa-bodyparser';
import createLogger from 'hyped-logger';

export default [loggerWinston(createLogger()), bodyParser()];
