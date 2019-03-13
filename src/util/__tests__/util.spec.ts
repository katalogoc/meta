import test, { ExecutionContext } from 'ava';
import sparqlResponse from '../../../fixtures/sparql-response.json';
import { parseSimplifiedSparqlJson } from '..';
import { HashMap } from '../../types';
import { inspect } from 'util';

const parsed = parseSimplifiedSparqlJson(sparqlResponse, {
  primaryKeyName: 'id',
  plural: {
    author: true,
    format: false,
    language: false,
    source: (row: HashMap<any>) => ({
      url: row.source,
      format: row.format,
      language: row.language,
    }),
  },
});

test('util.parseSimplifiedSparqlJson', (t: ExecutionContext) => {
  t.deepEqual(parsed, [
    {
      id: 'http://www.gutenberg.org/ebooks/1',
      title: 'The Declaration of Independence of the United States of America',
      author: ['http://en.wikipedia.org/wiki/Thomas_Jefferson'],
      source: [
        {
          url: 'http://www.gutenberg.org/ebooks/1.txt.utf-8',
          format: 'application/rdf+xml',
          language: 'en',
        },
        {
          url: 'http://www.gutenberg.org/ebooks/1.txt.utf-8',
          format: 'application/x-mobipocket-ebook',
          language: 'en',
        },
        {
          url: 'http://www.gutenberg.org/files/1/1-0.zip',
          format: 'application/prs.tex',
          language: 'en',
        },
        {
          url: 'http://www.gutenberg.org/files/1/1-0.zip',
          format: 'application/zip',
          language: 'en',
        },
      ],
    },
    {
      id: 'http://www.gutenberg.org/ebooks/100',
      title: 'The Complete Works of William Shakespeare',
      author: ['http://en.wikipedia.org/wiki/William_Shakespeare'],
      source: [
        {
          url: 'http://www.gutenberg.org/files/100/100-h.zip',
          format: 'application/x-mobipocket-ebook',
          language: 'en',
        },
        {
          url: 'http://www.gutenberg.org/files/100/100-h.zip',
          format: 'application/rdf+xml',
          language: 'en',
        },
      ],
    },
  ]);
});
