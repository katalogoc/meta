import { ApolloServer } from 'apollo-server-koa';
import { RedisCache } from 'apollo-server-redis';
import parseDbUrl from 'parse-database-url';
import createLogger from 'hyped-logger';
import typeDefs from './schema';
import config from './config';
import resolvers from './resolvers';
import dataSources from './dataSources/index';

const logger = createLogger();

export default new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  cacheControl: true,
  engine: {
    apiKey: config.get('ENGINE_API_KEY'),
  },
  cache: new RedisCache({
    connectTimeout: 5000,
    reconnectOnError(err: Error) {
      logger.info('Reconnect on error', err);

      const targetError = 'READONLY';

      if (err.message.slice(0, targetError.length) === targetError) {
        // Only reconnect when the error starts with "READONLY"
        return true;
      }
      return false;
    },
    retryStrategy(times: number) {
      logger.info('Redis Retry', times);

      if (times >= 3) {
        return undefined;
      }

      const delay = Math.min(times * 50, 5000);

      return delay;
    },
    socket_keepalive: false,
    ...parseDbUrl(config.get('REDIS_URL')),
  }),
});
