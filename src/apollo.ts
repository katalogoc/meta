import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './schema';
import config from './config';
import resolvers from './resolvers';
import dataSources from './dataSources/index';

export default new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  cacheControl: true,
  engine: {
    apiKey: config.get('ENGINE_API_KEY'),
  },
});
