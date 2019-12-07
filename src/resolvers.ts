import { Resolvers } from './common/types';

const resolvers: Resolvers = {
  Query: {
    async author(_, variables, { dataSources }) {
      return dataSources.authorAPI.getById(variables.id);
    },
    async authors(_, variables, { dataSources }) {
      return dataSources.authorAPI.getAll(variables.filter, variables.options);
    },
    async searchAuthorByName(_, variables, { dataSources }) {
      return dataSources.authorAPI.getByName(variables.name);
    },
    async text(_, variables, { dataSources }) {
      return dataSources.textAPI.getById(variables.id);
    },
    async texts(_, variables, { dataSources }) {
      return dataSources.textAPI.getAll(variables.options);
    },
  },
  Mutation: {
    async saveText(_, variables, { dataSources }) {
      return dataSources.textAPI.upsert(variables.text);
    },
    async saveAuthor(_, variables, { dataSources }) {
      return dataSources.authorAPI.upsert(variables.author);
    },
    async deleteTexts(_, variables, { dataSources }) {
      return dataSources.textAPI.deleteTexts(variables.ids);
    },
    async deleteAuthors(_, variables, { dataSources }) {
      return dataSources.authorAPI.deleteAuthors(variables.ids);
    },
  },
};

export default resolvers;
