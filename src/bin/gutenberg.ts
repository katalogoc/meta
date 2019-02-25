#!/usr/bin/node

import createLogger from 'hyped-logger';
import gutenberg from '../import/gutenberg';

const logger = createLogger(module.filename);

(async () => {
  for await (const doc of gutenberg()) {
    // logger.info(logger.deep(doc));
  }
})();
