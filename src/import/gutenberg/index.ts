import { pipe } from 'ramda';
import fs from 'fs';
import mkdirp from 'mkdirp';
import AdmZip, { IZipEntry } from 'adm-zip';
import { resolve, join, extname } from 'path';
import { promisify } from 'util';
import xmlParser from 'fast-xml-parser';
import config from '../../config';
import createLogger from 'hyped-logger';
import { traverse, filter, map, download, downloadStream, untar } from '../utils';
import rimraf from 'rimraf';
import dropLastWhile from 'ramda/es/dropLastWhile';

const logger = createLogger();

const fixturesDir = resolve(__dirname, '..', '..', '..', 'fixtures');

const rdfFiles = join(fixturesDir, 'rdf-files');

const readFile = promisify(fs.readFile);

const process = (rootDir: string) =>
  pipe(
    traverse,
    filter((file: string) => extname(file) === '.rdf'),
    map(async (file: string) => {
      const xml = await readFile(file, 'utf8');

      return xmlParser.parse(xml);
    })
  )(rootDir, undefined);

export default async function* main() {
  await promisify(rimraf)('tmp/catalog.zip');

  await promisify(mkdirp)('tmp/rdf');

  const zipFilePath = 'tmp/catalog.zip';

  logger.info(`Start fetching Gutenberg catalog from ${config.get('GUTENBERG_CATALOG')}`);

  await download(config.get('GUTENBERG_CATALOG'), zipFilePath);

  logger.info('Download successful!');

  logger.info('Start extracting');

  const zip = new AdmZip(zipFilePath);

  await zip.extractAllTo('tmp/rdf', true);

  await untar('tmp/rdf/rdf-files.tar', 'tmp/rdf');

  logger.info('Extraction successfull!');

  yield* process('tmp/rdf');

  return promisify(rimraf)('tmp');
}
