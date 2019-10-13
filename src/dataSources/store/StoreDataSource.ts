import { DgraphClient, Mutation } from 'dgraph-js';
import { DataSource } from 'apollo-datasource';
import { Text } from '../../types';
import createLogger from 'hyped-logger';
import _ from 'lodash';
import createText from '../../domain/text';

const logger = createLogger();

class StoreDataSource extends DataSource {
    private client: DgraphClient;

    constructor(client: DgraphClient) {
        super();

        this.client = client;
    }

    public async upsertText(text: Text) {
        const query = `
            query getText($id: string) {
                text(func: uid($id)) {
                    uid
                    title
                    url
                    authors {
                        name
                    }
                    subject
                }
            }
        `;

        const txn = this.client.newTxn();

        let uid = null;

        try {
            const res = await txn.queryWithVars(query, {
                $id: text.id || '',
            });

            const json = res.getJson();

            if (!json.text.length) {
                const mutation = new Mutation();

                mutation.setSetJson({
                    uid: `_:${text.url}`,
                    type: 'Text',
                    ...text,
                });

                const result = await txn.mutate(mutation);

                uid = _.get(result.toObject(), 'uidsMap.0.1');
            } else {
                uid = _.get(json, 'text.0.uid');
            }

            await txn.commit();

            return createText({
                id: uid,
                title: json.title || '',
                url: json.url || '',
            });
        } catch (err) {
            logger.error(`Couldn't upsert a text, error: ${err}`);

            throw err;
        }
    }
}

export default StoreDataSource;
