import * as dg from 'dgraph-js';
import grpc from 'grpc';
import config from '../config';

const clientStub = new dg.DgraphClientStub(
  `${config.get('DGRAPH_HOST')}:${config.get('DGRAPH_PORT')}`,
  grpc.credentials.createInsecure()
);

export default new dg.DgraphClient(clientStub);
