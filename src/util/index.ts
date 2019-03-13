import { promisify } from 'util';
import { SparqlClient, HashMap, QueryOptions } from '../types';
import { get } from 'lodash';
import R from 'ramda';
import fetch from 'isomorphic-fetch';
import wikidata from 'wikidata-sdk';
import createLogger from 'hyped-logger';

const logger = createLogger();

const wd: any = wikidata;

export const sparql = (client: SparqlClient, query: string) => promisify(client.query(query).execute.bind(client))();

type ResolverType = (...args: any[]) => Promise<any> | any;

export const mergeResolvers = (...resolverMaps: ResolverType[]) => Object.assign({}, ...resolverMaps);

type TransformFunction = (obj: any) => any;

interface ParseOptions {
  primaryKeyName?: string;
  plural?: HashMap<boolean | TransformFunction>;
}

const parserDefaults = {
  primaryKeyName: 'id',
  plural: {},
};

export const parseSimplifiedSparqlJson = (
  simplified: Array<HashMap<string>>,
  options: ParseOptions
): Array<HashMap<any>> => {
  const group = R.groupBy((row: HashMap<string>) => get(row, options.primaryKeyName!));

  const createRowFromRows = (rows: Array<HashMap<string>>, id: string) => {
    const pluralKeys = Object.keys(options.plural!);

    const plurals: HashMap<any[]> = {};

    const singulars: HashMap<string> = R.omit(pluralKeys, rows[0] || {});

    for (const row of rows) {
      for (const key of pluralKeys) {
        if (typeof options.plural![key] === 'function') {
          const transformFunction: TransformFunction = options.plural![key] as TransformFunction;

          const transformedRow = transformFunction(row);

          if (plurals[key]) {
            plurals[key].push(transformedRow);
          } else {
            plurals[key] = [transformedRow];
          }
        }
      }

      for (const key of Object.keys(row)) {
        const val = row[key];

        if (options.plural![key] && typeof options.plural![key] === 'boolean') {
          if (plurals[key] && !plurals[key].includes(val)) {
            plurals[key].push(val);
          } else {
            plurals[key] = [val];
          }
        }
      }
    }

    return {
      id,
      ...plurals,
      ...singulars,
    };
  };

  const grouped = R.mapObjIndexed(createRowFromRows, group(simplified));

  return Object.values(grouped);
};

export const parseSparqlJson = (response: any, userOptions: ParseOptions = {}): Array<HashMap<any>> => {
  const options = {
    ...parserDefaults,
    ...userOptions,
  };

  const simplified = wd.simplify.sparqlResults(response);

  return parseSimplifiedSparqlJson(simplified, options);
};

export const ping = (host: string): Promise<string> =>
  fetch(host).then((res: Response) => (res.status >= 400 ? Promise.reject(res) : res.text()));

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export const createPaginatedStream = <T = any>(request: AsyncFunction<T>) =>
  async function* requester(options?: QueryOptions): AsyncIterableIterator<T> {
    try {
      const result = await request(options);

      if (result) {
        yield result;

        yield* requester({
          limit: options!.limit,
          offset: options!.offset + options!.limit,
        });
      }
    } catch (err) {
      logger.error(err);
    }
  };
