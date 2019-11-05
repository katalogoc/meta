import { Author } from '../common/types';
import { TextNode } from '../text';

export type AuthorNode = Partial<Author> & {
  uid: string;
  texts: TextNode[];
};
