import { DataSource } from 'apollo-datasource';
import { DgraphClient } from 'dgraph-js';
import { getAll } from './getAll';
import { getById } from './getById';
import { upsert } from './upsert';
import { SaveAuthorInput, Author, QueryOptions } from '../common/types';

export class AuthorAPI extends DataSource {
  private client: DgraphClient;

  constructor(client: DgraphClient) {
    super();

    this.client = client;
  }

  public async getAll(queryOptions: QueryOptions): Promise<Author[]> {
    return getAll(this.client, queryOptions);
  }

  public async getById(id: string): Promise<Author | null> {
    return getById(this.client, id);
  }

  public async upsert(author: SaveAuthorInput): Promise<Author> {
    return upsert(this.client, author);
  }
}