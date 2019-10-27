import { Context } from 'koa';
import { AsyncFunction } from './types';
import createLogger from 'hyped-logger';

const logger = createLogger();

export default async (_: Context, next: AsyncFunction) => {
  try {
    await next();
  } catch (err) {
    logger.error(err);
  }
};
