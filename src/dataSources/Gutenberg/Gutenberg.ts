import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Author, Text, SparqlClient, QueryOptions } from '../../types';
import { sparql, parseSparqlJson, ping } from '../../util';
import { getAllTexts } from './queries';

class Gutenberg extends DataSource {
  private context: DataSourceConfig<any>['context'];

  private client: SparqlClient;

  constructor(client: SparqlClient) {
    super();

    this.client = client;
  }

  public async initialize({ context }: DataSourceConfig<any>): Promise<void> {
    this.context = context;
  }

  public async getAllTexts(options: QueryOptions) {
    const response = await sparql(this.client, getAllTexts(options));

    return parseSparqlJson(response, 'id').map((text: Text) => ({
      ...text,
      wikiAboutAuthors: Array.isArray(text.wikiAboutAuthors) ? text.wikiAboutAuthors : [text.wikiAboutAuthors],
    }));
  }

  public async getAuthorBooks(): Promise<Author | null> {
    return null;
  }
}

export default Gutenberg;
