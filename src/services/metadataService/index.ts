import { DgraphClient } from 'dgraph-js';
import { upsertText } from './upsertText';
import { MetadataService, AsyncFunction } from '../../types';

export function createServiceForClient(client: DgraphClient): MetadataService {
  const bound = (fn: AsyncFunction) => fn.bind(null, client);

  return {
    upsertText: bound(upsertText),
  };
}
