import { ApolloServer } from 'apollo-server-koa';
import path from 'path';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import config from './config';
import resolvers from './resolvers';
import { createClient } from './common/db';
import { AuthorAPI } from './author';
import { TextAPI } from './text';

const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

const dbClient = createClient();

dbClient.setDebugMode(config.get('DGRAPH_DEBUG_MODE'));

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default new ApolloServer({
  schema,
  dataSources: () => ({
    textAPI: new TextAPI(dbClient),
    authorAPI: new AuthorAPI(dbClient),
  }),
  cacheControl: true,
  engine: {
    apiKey: config.get('ENGINE_API_KEY'),
  },
});
