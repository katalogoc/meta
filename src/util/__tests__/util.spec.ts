import test, { ExecutionContext } from 'ava';
import sparqlResponse from '../../../fixtures/sparql-response.json';
import { parseSparqlJson } from '..';

const parsed = parseSparqlJson(sparqlResponse, 'text');

test('util.parseSparqlJson', (t: ExecutionContext) => {
  t.deepEqual(parsed, [
    {
      text: 'http://www.gutenberg.org/ebooks/10080',
      title: 'Mobilizing Woman-Power',
      authorWikiPage: 'http://en.wikipedia.org/wiki/Harriot_Eaton_Stanton_Blatch',
      issued: '2003-11-01',
      publisher: 'Project Gutenberg',
    },
    {
      text: 'http://www.gutenberg.org/ebooks/10279',
      title: `Uncle Tom's Cabin: Entrance of Topsy`,
      authorWikiPage: [
        'http://en.wikipedia.org/wiki/Harriet_Beecher_Stowe',
        'http://en.wikipedia.org/wiki/Len_Spencer',
      ],
      issued: '2003-11-01',
      publisher: 'Project Gutenberg',
    },
  ]);
});
