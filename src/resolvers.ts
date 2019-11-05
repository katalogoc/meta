import { SaveAuthorInput, SaveTextInput } from './common/types';

export default {
  Query: {
    async author(_: any, { id }: any, { dataSources }: any) {
      return dataSources.authorAPI.getById(id);
    },
    async authors(_: any, { id }: any, { dataSources }: any) {
      return dataSources.authorAPI.getAll(id);
    },
    async searchAuthorByName(_: any, { name }: any, { dataSources }: any) {
      return dataSources.authorAPI.getByName(name);
    },
    async text(_: any, { id }: any, { dataSources }: any) {
      return dataSources.textAPI.getById(id);
    },
    async texts(_: any, { options }: any, { dataSources }: any) {
      return dataSources.textAPI.getAll(options);
    },
  },
  Mutation: {
    async saveText(_: any, { text }: { text: SaveTextInput }, { dataSources }: any) {
      return dataSources.textAPI.upsert(text);
    },
    async saveAuthor(_: any, { author }: { author: SaveAuthorInput }, { dataSources }: any) {
      return dataSources.authorAPI.upsert(author);
    },
  },
};
