import { Author } from './Author';

export interface Text {
  url?: string;
  id?: string;
  title?: string;
  authors?: Author[];
  subject?: string[];
}
