import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { SaveTextInput, Text, QueryOptions, DataSourceContext } from '../common/types';
import { getAll } from './getAll';
import { getById } from './getById';
import { upsert } from './upsert';
import { deleteNodes } from '../common/db';

export class TextAPI extends DataSource {
  private context: DataSourceContext;

  public initialize(config: DataSourceConfig<DataSourceContext>) {
    this.context = config.context;
  }

  public async getAll(options: QueryOptions): Promise<Text[]> {
    return getAll(this.context.client, options);
  }

  public async getById(id: string): Promise<Text | null> {
    return getById(this.context.client, id);
  }

  public async upsert(text: SaveTextInput): Promise<string> {
    return upsert(this.context.client, text);
  }

  public async deleteTexts(ids: string[]): Promise<string[]> {
    return deleteNodes(this.context.client, ids);
  }
}
