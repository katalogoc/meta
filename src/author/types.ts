import { Author } from '../common/types';

export type AuthorNode = Partial<Author> & {
  uid: string;
};
