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
  ['real-bill']: {
    id: null,
    name: 'Real Bill',
    alias: ['Real Feel'],
    thumbnail: 'https://bill.com/my.png',
    birthdate: '1960-09-15T00:00:00.092Z',
    deathdate: '1999-07-11T01:01:02.092Z',
    texts: [],
  },
  ['jade-blade']: {
    id: null,
    name: 'Jade Blade',
    alias: ['Shark'],
    thumbnail: 'https://facebook.com/shark/avatar.jpg',
    birthdate: '1989-09-21T00:00:00.092Z',
    deathdate: null,
    texts: [],
  },
  ['jill-kill']: {
    id: null,
    name: 'Jill Kill',
    alias: ['Jelly'],
    thumbnail: 'https://facebook.com/jelly/avatar.jpg',
    birthdate: '1990-10-21T00:00:00.092Z',
    deathdate: null,
    texts: [],
  },
};

export default authors;
