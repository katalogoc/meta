import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Author } from '../types';

class DBpedia extends DataSource {
  private client: any;

  private context: any;

  constructor(DBpediaClient: any) {
    super();

    this.client = DBpediaClient;
  }

  public initialize(config: DataSourceConfig<any>): void {
    this.context = config.context;
  }

  public query(query: string): Promise<any> {
    return this.client.query(query);
  }
}

export default DBpedia;
