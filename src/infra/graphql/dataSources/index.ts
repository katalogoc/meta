import Gutenberg from './Gutenberg';
import GutenbergGraph from './Gutenberg/GutenbergGraph';
import DBpediaSource from './DBpedia';
import DBpediaClient from './DBpedia/DBpediaClient';

const gutenberg = new Gutenberg(GutenbergGraph.getInstance());

const DBpedia = new DBpediaSource(DBpediaClient.client());

export default () => ({
  gutenberg,
  DBpedia,
});

export * from './types';
