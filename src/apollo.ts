import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './schema';
import config from './config';
import resolvers from './resolvers';
import { createServiceForClient } from './services/metadataService';
import { createClient } from './db';
import GraphStore from './dataSources/GraphStore';

const dbClient = createClient();

dbClient.setDebugMode(config.get('DGRAPH_DEBUG_MODE'));

export default new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    graphStore: new GraphStore(createServiceForClient(dbClient)),
  }),
  cacheControl: true,
  engine: {
    apiKey: config.get('ENGINE_API_KEY'),
  },
});
