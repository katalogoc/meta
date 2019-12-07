import { DgraphClient } from 'dgraph-js';

export interface QueryOptions {
  limit: number;
  offset: number;
}

export interface HashMap<T> {
  [key: string]: T;
}

export type AsyncFunction<A = any, O = any> = (...args: A[]) => Promise<O>;

export interface DataSourceContext {
  client: DgraphClient;
}

export * from './generated';
