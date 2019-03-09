import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Author, SparqlClient } from '../../types';
import { sparql, parseSparqlJson } from '../../util';
import { getDbPediaEntityByWikiUrl } from './queries';
import { inspect } from 'util';

class DBpedia extends DataSource {
  private client: SparqlClient;

  private context: any;

  constructor(client: SparqlClient) {
    super();

    this.client = client;
  }

  public initialize(config: DataSourceConfig<any>): void {
    this.context = config.context;
  }

  public query(query: string): Promise<any> {
    return this.client.query(query);
  }

  public async getAuthorByWikiUrl(wikiUrl: string): Promise<any> {
    const response = await sparql(this.client, getDbPediaEntityByWikiUrl(wikiUrl));

    const authors = parseSparqlJson(response, 'id');

    return authors.length ? authors[0] : null;
  }
}

export default DBpedia;
