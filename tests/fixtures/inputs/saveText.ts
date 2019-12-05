import { HashMap, SaveTextInput, DataSource } from '../../../src/common/types';

const texts: HashMap<SaveTextInput> = {
  'hawaiian-language': {
    title: 'Hawaiian language',
    xid: '272e749f-b937-4d03-8897-73ec75fab6fe',
    source: DataSource.Gutenberg,
    url: 'https://hawaiian-language-handbook.com/book',
    subject: ['linguistics', 'polynesian languages'],
    authors: [],
  },
  'cooking-salads': {
    title: 'Cooking salads',
    xid: '20b38d7bb-d4ea-4c2e-99af-337db78f3395',
    source: DataSource.Gutenberg,
    url: 'https://salads.com/how-to-cook',
    subject: ['cooking'],
    authors: [],
  },
  'design-patters': {
    title: 'Design Patterns',
    xid: '15b6f067-48a8-4cf0-9d62-bda004789cfb',
    source: DataSource.Gutenberg,
    url: 'https://en.wikipedia.org/wiki/Design_Patterns',
    subject: ['computer programming', 'design patterns'],
    authors: [],
  },
  'mein-kampf': {
    title: 'Mein Kampf',
    xid: '36e4d5f9-9f7d-415b-8af9-5ea94ae1b039',
    source: DataSource.Gutenberg,
    url: 'https://en.wikipedia.org/wiki/Mein_Kampf',
    subject: ['nazism'],
    authors: [],
  },
  'around-the-world-in-80-days': {
    title: 'Around the World in 80 Days',
    xid: '16cb4ce0-ee0f-4192-9bcc-e38a6f41df58',
    source: DataSource.Gutenberg,
    url: 'https://en.wikipedia.org/wiki/Around_the_World_in_Eighty_Days',
    subject: ['adventures'],
    authors: [],
  },
};

export default texts;
