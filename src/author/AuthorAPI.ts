import { DataSource } from 'apollo-datasource';
import { DgraphClient } from 'dgraph-js';
import { get } from './get';
import { upsert } from './upsert';
import { SaveAuthorInput, Author } from '../common/types';

export class AuthorAPI extends DataSource {
  private client: DgraphClient;

  constructor(client: DgraphClient) {
    super();

    this.client = client;
  }

  public async get(id: string): Promise<Author | null> {
    return get(this.client, id);
  }

  public async upsert(author: SaveAuthorInput): Promise<Author> {
    return upsert(this.client, author);
  }
}
