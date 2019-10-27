import { DataSource } from 'apollo-datasource';
import { DgraphClient } from 'dgraph-js';
import { SaveTextInput, Text } from '../common/types';
import { upsert } from './upsert';

export class TextAPI extends DataSource {
  private client: DgraphClient;

  constructor(client: DgraphClient) {
    super();
    this.client = client;
  }

  public async upsert(text: SaveTextInput): Promise<Text> {
    return upsert(this.client, text);
  }
}
