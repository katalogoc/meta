import { Author, Text } from '../common/types';

export interface AliasNode {
  uid: string;
  value: string;
}

export type AuthorNode = Partial<Omit<Author, 'alias'>> & {
  uid: string;
  alias: AliasNode[];
};
