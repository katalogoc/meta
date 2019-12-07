import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { getAll } from './getAll';
import { getById } from './getById';
import { getByName } from './getByName';
import { upsert } from './upsert';
import { SaveAuthorInput, Author, QueryOptions, AuthorFilterInput, DataSourceContext } from '../common/types';
import { deleteNodes } from '../common/db';

export class AuthorAPI extends DataSource {
  private context: DataSourceContext;

  public initialize(config: DataSourceConfig<DataSourceContext>) {
    this.context = config.context;
  }

  public async getAll(filter: AuthorFilterInput, queryOptions: QueryOptions): Promise<Author[]> {
    return getAll(this.context.client, filter, queryOptions);
  }

  public async getById(id: string): Promise<Author | null> {
    return getById(this.context.client, id);
  }

  public async getByName(name: string): Promise<Author | null> {
    return getByName(this.context.client, name);
  }

  public async upsert(author: SaveAuthorInput): Promise<string> {
    return upsert(this.context.client, author);
  }

  public async deleteAuthors(ids: string[]): Promise<string[]> {
    return deleteNodes(this.context.client, ids);
  }
}
