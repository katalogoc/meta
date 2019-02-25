import { GBook } from '../types';
import { TextInterface } from '../../../infra/db/models/Text';
import { createDataMapper } from '../../utils';
import { get, has } from 'lodash';

export default createDataMapper(
  (book: GBook): TextInterface | null => ({
    url: get(book, ''),
    title: get(book, 'dcterms:title'),
    type: get(book, ['dcterms:type', 'rdf:Description', 'rdf:value']),
    languageId: get(book, ['dcterms:language', 'rdf:Description', 'rdf:value']),
    authors: [],
    format: 'html',
    issued: get(book, ['dcterms:issued']),
  })
);
