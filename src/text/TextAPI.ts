import { DataSource } from 'apollo-datasource';
import { DgraphClient } from 'dgraph-js';
import { SaveTextInput, Text, QueryOptions } from '../common/types';
import { getAll } from './getAll';
import { getById } from './getById';
import { upsert } from './upsert';

export class TextAPI extends DataSource {
  private client: DgraphClient;

  constructor(client: DgraphClient) {
    super();
    this.client = client;
  }

  public async getAll(options: QueryOptions): Promise<Text[]> {
    return getAll(this.client, options);
  }
  public async getById(id: string): Promise<Text | null> {
    return getById(this.client, id);
  }

  public async upsert(text: SaveTextInput): Promise<string> {
    return upsert(this.client, text);
  }
}
