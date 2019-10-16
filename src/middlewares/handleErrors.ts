import { Context } from 'koa';
import { AsyncFunction } from '../types';

export default async (ctx: Context, next: AsyncFunction) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
  }
};
