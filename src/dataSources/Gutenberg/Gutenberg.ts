import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Author, Text, SparqlClient, QueryOptions, HashMap } from '../../types';
import { sparql, parseSparqlJson } from '../../util';
import text from '../../domain/text';
import { getAllTexts } from './queries';
import { get } from 'lodash';

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

    const result = parseSparqlJson(response, {
      primaryKeyName: 'id',
      plural: {
        authors: true,
        subject: true,
        format: false,
        language: false,
        source: (row: HashMap<any>) => ({
          url: row.source,
          format: row.format,
          language: row.language,
        }),
      },
    });

    return result.map((t: Text) =>
      text({
        ...t,
        url: get(t, ['source', 0, 'url']),
      })
    );
  }

  public async getAuthorBooks(): Promise<Author | null> {
    return null;
  }
}

export default Gutenberg;
