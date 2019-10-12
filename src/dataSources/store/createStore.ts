import { DgraphClient } from 'dgraph-js';
import { DataSource } from 'apollo-datasource';

class Store extends DataSource {
    client: DgraphClient;

    constructor(client: DgraphClient) {
        super();

        this.client = client;
    }

    public async upsertText(text: any) {
        console.log('Text', text);
    }
}
export default (client: DgraphClient) => new Store(client);
