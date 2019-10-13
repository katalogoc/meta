import * as dg from 'dgraph-js';
import schema from './schema';
import createLogger from 'hyped-logger';

const logger = createLogger();

export default (client: dg.DgraphClient) => ({
    async init() {
        const operation = new dg.Operation();

        operation.setSchema(schema);

        try {
            await client.alter(operation);

            logger.debug(`Dgraph schema was successfully alterered`);
        } catch (err) {
            logger.error(`Could't alter database schema, error: ${err}`);

            throw err;
        }
    },
    get client() {
        return client;
    },
});
