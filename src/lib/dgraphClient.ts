import * as dgraph from 'dgraph-js';
import grpc from 'grpc';
import config from '../config';

const clientStub = new dgraph.DgraphClientStub(
  `${config.get('DGRAPH_HOST')}:${config.get('DGRAPH_PORT')}`,
  grpc.credentials.createInsecure(),
);

export default new dgraph.DgraphClient(clientStub);