import { extname } from 'path';
import fs from 'fs';
import xmlParser from 'fast-xml-parser';
import R from 'ramda';
import { get } from 'lodash';
import { promisify } from 'util';
import { traverse, filter, map, take } from '../utils';
import config from '../../../../config';
import { RDFDoc } from '../types';
import rdflib, { IndexedFormula, Formula, Namespace } from 'rdflib';
import createLogger from 'hyped-logger';

const logger = createLogger();

const readFile = promisify(fs.readFile);

const pipe: any = R.pipe;

const parse: any = promisify(rdflib.parse);

export const GUTENBERG = Namespace('http://www.gutenberg.org/');

export const PG_TERMS = Namespace('http://www.gutenberg.org/2009/pgterms/');

export const DC_TERMS = Namespace('http://purl.org/dc/terms/');

export interface ParsedData {
  json: RDFDoc;
  rdf: string;
}

const DOCUMENTS_MAX_COUNT = config.get('GUTENBERG_DOCUMENTS_MAX_COUNT');

export const parseRdfRoot = (rootDir: string, store: Formula) =>
  pipe(
    traverse,
    filter((file: string) => extname(file) === '.rdf'),
    take(DOCUMENTS_MAX_COUNT),
    map(async (file: string) => {
      const rdf: string = await readFile(file, 'utf8');

      parse(rdf, store, 'http://gutenberg.com/files', 'application/rdf+xml');

      const used = process.memoryUsage().heapUsed / 1024 / 1024;

      // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    })
  )(rootDir, undefined);

export const createStore = (): IndexedFormula => rdflib.graph();

export async function* loadDataToStore(rootDir: string, store: Formula) {
  yield* parseRdfRoot(rootDir, store);

  return store;
}

export default async (rootDir: string, store: Formula) => {
  for await (const doc of loadDataToStore(rootDir, store)) {
    // logger.info(doc);
  }

  return store;
};

export const getNodeValue = (node: any, defaultValue?: any) => get(node, 'value') || defaultValue;
