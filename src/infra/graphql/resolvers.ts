import { Text } from '../../types';

export default {
  Query: {
    async author(_: any, { id }: any, { dataSources }: any) {
      const gutenbergData = dataSources.gutenberg.getAuthorById(id);

      return gutenbergData;
    },
    async texts(_: any, { options }: any, { dataSources }: any) {
      return dataSources.gutenberg.getAllTexts(options);
    },
  },
  Author: {
    async texts(author: any, { name }: any, { dataSources }: any) {
      return dataSources.gutenberg.getAuthorBooks(author.id);
    },
  },
  Text: {
    async author(text: Text, _: any, { dataSources }: any) {
      return dataSources.DBpedia.getAuthorByWikiUrl(text.aboutAuthor);
    },
  },
};
