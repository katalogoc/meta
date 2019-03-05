import Gutenberg from './Gutenberg';
import SparqlClient from 'sparql-client';
import DBpediaSource from './DBpedia';
import config from '../../../config';

const gutenberg = new Gutenberg(new SparqlClient(config.get('GUTENBERG_SPARQL_ENDPOINT')));

const DBpedia = new DBpediaSource(new SparqlClient(config.get('DB_PEDIA_SPARQL_ENDPOINT')));

export default () => ({
  gutenberg,
  DBpedia,
});
