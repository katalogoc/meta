import fs from 'fs';
import mkdirp from 'mkdirp';
import AdmZip from 'adm-zip';
import { join } from 'path';
import { promisify } from 'util';
import createLogger from 'hyped-logger';
import { download, untar } from '../utils';
import config from '../../../../config';

const GUTENBERG_DIR = join(process.env.HOME || '~', '.gutenberg');

const RDF_PATH = join(GUTENBERG_DIR, 'tmp', 'rdf');

const logger = createLogger();

const exists = promisify(fs.exists);

async function* initGutenbergSource() {
  await promisify(mkdirp)(RDF_PATH);

  const ZIP_FILE = join(RDF_PATH, 'catalog.zip');

  const TAR_FILE = join(RDF_PATH, 'rdf-files.tar');

  const EXTRACTED_DIR = join(RDF_PATH, 'extracted');

  if (await exists(EXTRACTED_DIR)) {
    yield 'Found cached catalog. Download skipped';
  } else {
    yield `Start downloading Gutenberg catalog from ${config.get('GUTENBERG_CATALOG')} to ${ZIP_FILE}`;

    await download(config.get('GUTENBERG_CATALOG'), ZIP_FILE);

    yield 'Download successful!';

    yield `Start extracting to ${EXTRACTED_DIR}`;

    const zip = new AdmZip(ZIP_FILE);

    await zip.extractAllTo(RDF_PATH, true);

    await untar(TAR_FILE, EXTRACTED_DIR);

    yield 'Extraction successfull!';
  }

  return RDF_PATH;
}

export default async () => {
  for await (const msg of initGutenbergSource()) {
    logger.info(msg);
  }

  return RDF_PATH;
};
