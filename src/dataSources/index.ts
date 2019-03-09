import Gutenberg from './Gutenberg';
import SparqlClient from 'sparql-client';
import DBpediaSource from './DBpedia';
import createLogger from 'hyped-logger';
import config from '../config';
import { ping } from '../util';

const logger = createLogger();

const gutenbergSparqlEndpoint = config.get('GUTENBERG_SPARQL_ENDPOINT');

const dbPediaSparqlEndpoint = config.get('DB_PEDIA_SPARQL_ENDPOINT');

const gutenberg = new Gutenberg(new SparqlClient(gutenbergSparqlEndpoint));

const DBpedia = new DBpediaSource(new SparqlClient(dbPediaSparqlEndpoint));

export default () => ({
  gutenberg,
  DBpedia,
});

(async function checkHosts() {
  for (const host of ['http://fuseki:3030/', dbPediaSparqlEndpoint]) {
    try {
      const res = await ping(host);

      logger.info(`${host} is ok`, res);
    } catch (err) {
      logger.warn(`${host} is unavailable: `, err);
    }
  }
})();
