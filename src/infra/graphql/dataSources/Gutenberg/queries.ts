import { QueryOptions } from '../../../../types';

export const getAuthorWikiLinks = () => `
  PREFIX dc: <http://purl.org/dc/terms/>
  PREFIX pg: <http://www.gutenberg.org/2009/pgterms/>

  SELECT DISTINCT ?webpage
  WHERE {
    ?text dc:creator/pg:webpage ?webpage
  }
`;

export const getAllTexts = ({ limit, offset }: QueryOptions) => `
  PREFIX dc: <http://purl.org/dc/terms/>
  PREFIX pg: <http://www.gutenberg.org/2009/pgterms/>

  SELECT DISTINCT *
  WHERE {
    ?id dc:title ?title ;
          dc:creator/pg:webpage ?aboutAuthor ;
          dc:issued ?issued ;
          dc:publisher ?publisher ;
          dc:language ?language
  }
  LIMIT ${limit}
  OFFSET ${offset}
`;
