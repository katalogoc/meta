import { promisify } from 'util';
import { SparqlClient, SparqlBinding, HashMap } from '../../types';
import { get, has } from 'lodash';
import R from 'ramda';

export const sparql = (client: SparqlClient, query: string) => promisify(client.query(query).execute.bind(client))();

type ResolverType = (...args: any[]) => Promise<any> | any;

export const mergeResolvers = (...resolverMaps: ResolverType[]) => Object.assign({}, ...resolverMaps);

export const parseSparqlJson = (response: any, primaryKey: string): Array<HashMap<any>> => {
  const bindings = get(response, ['results', 'bindings'], []);

  const byPrimaryKey = R.groupBy((row: HashMap<SparqlBinding>) => get(row, [primaryKey, 'value']));

  const grouped = byPrimaryKey(bindings);

  const flatten = (binds: SparqlBinding[]) =>
    R.map((obj: SparqlBinding) => R.map((o: any) => get(o, 'value'), obj as any), binds as any);

  const flattened = R.map(flatten, grouped as any);

  const deduped = R.map(
    (rows: HashMap<any>) =>
      rows.reduce((acc: HashMap<any>, row: HashMap<any>) => {
        return {
          ...acc,
          ...Object.keys(row).reduce(
            (a: HashMap<any>, key: string) => ({
              ...a,
              ...(has(acc, key)
                ? {
                    [key]: Array.isArray(get(acc, key))
                      ? get(acc, key).concat([row[key]])
                      : get(acc, key).includes(row[key])
                      ? get(acc, key)
                      : [get(acc, key), row[key]],
                  }
                : {
                    [key]: row[key],
                  }),
            }),
            {}
          ),
        };
      }, {}),
    flattened
  );

  return Object.values(deduped);
};
