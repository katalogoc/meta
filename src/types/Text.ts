import { Author } from './Author';

export interface Text {
  url: string | null;
  id: string | null;
  title: string | null;
  authors: Author[];
  subject: string[];
}
