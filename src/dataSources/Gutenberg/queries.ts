import { QueryOptions } from '../../types';

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
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

  SELECT *
  WHERE {
    ?id dc:title ?title ;
        dc:creator/pg:webpage ?authors ;
        dc:hasFormat ?source ;
        dc:hasFormat/dc:format/rdf:value ?format;
        dc:subject/rdf:value ?subject ;
        dc:language/rdf:value ?language .
    {
      SELECT ?id
      WHERE {
        ?id dc:title ?title ;
            dc:creator/pg:webpage ?authors ;
            dc:hasFormat ?source ;
            dc:hasFormat/dc:format/rdf:value ?format;
            dc:subject/rdf:value ?subject ;
            dc:language/rdf:value ?language .
      }
      GROUP BY ?id
      ORDER BY ?id
      LIMIT ${limit}
      OFFSET ${offset}
    }
  }
`;
