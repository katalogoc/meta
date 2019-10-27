import { SaveAuthorInput, SaveTextInput } from './common/types';

export default {
  Query: {
    async author(_: any, { id }: any, { dataSources }: any) {
      return dataSources.authorAPI.get(id);
    },
    async texts(_: any, { options }: any, { dataSources }: any) {
      return dataSources.gutenberg.getAllTexts(options);
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
