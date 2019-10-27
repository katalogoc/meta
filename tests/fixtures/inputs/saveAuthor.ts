import { HashMap, SaveAuthorInput } from '../../../src/common/types';

const authors: HashMap<SaveAuthorInput> = {
  ['john-doe']: {
    id: null,
    name: 'John Doe',
    alias: ['Butcher', 'Mad John'],
    thumbnail: null,
    birthdate: '1991-10-26T23:26:18.092Z',
    deathdate: null,
    texts: [],
  },
};

export default authors;
