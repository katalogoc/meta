import { Author } from './Author';

export interface Text {
  id: string | null;
  title: string | null;
  url: string;
  authors: Author[];
  subject: string[];
}
