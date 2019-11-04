import { HashMap, SaveTextInput } from '../../../src/common/types';

const texts: HashMap<SaveTextInput> = {
  'hawaiian-language': {
    title: 'Hawaiian language',
    url: 'https://hawaiian-language-handbook.com/book',
    subject: ['linguistics', 'polynesian languages'],
    authors: [],
  },
  'cooking-salads': {
    title: 'Cooking salads',
    url: 'https://salads.com/how-to-cook',
    subject: ['cooking'],
    authors: [],
  },
  'design-patters': {
    title: 'Design Patterns',
    url: 'https://en.wikipedia.org/wiki/Design_Patterns',
    subject: ['computer programming', 'design patterns'],
    authors: [],
  },
  'mein-kampf': {
    title: 'Mein Kampf',
    url: 'https://en.wikipedia.org/wiki/Mein_Kampf',
    subject: ['nazism'],
    authors: [],
  },
  'around-the-world-in-80-days': {
    title: 'Around the World in 80 Days',
    url: 'https://en.wikipedia.org/wiki/Around_the_World_in_Eighty_Days',
    subject: ['adventures'],
    authors: [],
  },
};

export default texts;
