import Gutenberg from './Gutenberg';
import SparqlClient from 'sparql-client';
import DBpediaSource from './DBpedia';
import config from '../config';

const gutenbergSparqlEndpoint = config.get('GUTENBERG_SPARQL_ENDPOINT');

const dbPediaSparqlEndpoint = config.get('DB_PEDIA_SPARQL_ENDPOINT');

const gutenberg = new Gutenberg(new SparqlClient(gutenbergSparqlEndpoint));

const DBpedia = new DBpediaSource(new SparqlClient(dbPediaSparqlEndpoint));

export default () => ({
  gutenberg,
  DBpedia,
});
