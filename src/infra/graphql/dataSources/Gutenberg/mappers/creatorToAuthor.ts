import { GAgent, GCreator } from '../types';
import { AuthorInterface } from '../../../infra/db/models/Author';
import { createDataMapper } from '../../utils';
import { get, has } from 'lodash';

export default createDataMapper(
  (creator: GCreator): AuthorInterface | null =>
    has(creator, 'pgterms:agent')
      ? {
          name: get(creator, ['pgterms:agent', 'pgterms:name']),
          alias: get(creator, ['pgterms:agent', 'pgterms:alias']),
          birthdate: get(creator, ['pgterms:agent', 'pgterms:birthdate'], null),
          deathdate: get(creator, ['pgterms:agent', 'pgterms:deathdate'], null),
        }
      : null
);
