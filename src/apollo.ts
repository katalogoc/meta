import { ApolloServer } from 'apollo-server-koa';
import path from 'path';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import config from './config';
import resolvers from './resolvers';
import { createClient } from './common/db';
import { AuthorAPI } from './author';
import { TextAPI } from './text';

const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

const schema = makeExecutableSchema({ typeDefs, resolvers: resolvers as IResolvers });

export default new ApolloServer({
  schema,
  dataSources: () => ({
    textAPI: new TextAPI(),
    authorAPI: new AuthorAPI(),
  }),
  context: () => ({
    client: createClient(),
  }),
  cacheControl: true,
  engine: {
    apiKey: config.get('ENGINE_API_KEY'),
  },
});
