import * as dg from 'dgraph-js';
import grpc from 'grpc';
import { schema } from './schema';
import createLogger from 'hyped-logger';
import config from '../config';

const logger = createLogger();

export function createClient() {
    const clientStub = new dg.DgraphClientStub(
        `${config.get('DGRAPH_HOST')}:${config.get('DGRAPH_PORT')}`,
        grpc.credentials.createInsecure()
    );

    return new dg.DgraphClient(clientStub);
}

export async function init(client: dg.DgraphClient) {
    const operation = new dg.Operation();

    operation.setSchema(schema);

    try {
        await client.alter(operation);

        logger.debug(`Dgraph schema was successfully alterered`);
    } catch (err) {
        logger.error(`Could't alter database schema, error: ${err}`);

        throw err;
    }
}

// Drop all data including schema from the Dgraph instance. This is useful
// for small examples such as this, since it puts Dgraph into a clean
// state.
export async function dropGraphAndSchema(client: dg.DgraphClient) {
    const operation = new dg.Operation();

    operation.setDropAll(true);

    try {
        await client.alter(operation);

        logger.debug(`Dgraph schema was dropped, data - removed`);
    } catch (err) {
        logger.error(`Could't drop database, error: ${err}`);

        throw err;
    }
}
