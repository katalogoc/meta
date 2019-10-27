import createLogger from 'hyped-logger';
import { QueryOptions } from './types';

const logger = createLogger();

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export const createPaginatedStream = <T = any>(request: AsyncFunction<T>) =>
  async function* requester(options?: QueryOptions): AsyncIterableIterator<T> {
    try {
      const result = await request(options);

      if (result) {
        yield result;

        yield* requester({
          limit: options!.limit,
          offset: options!.offset + options!.limit,
        });
      }
    } catch (err) {
      logger.error(err);
    }
  };

export const blankNodeId = (id: string) => `_:${id}`;
