import { Text } from '../common/types';
import { AuthorNode } from '../author';

export type TextNode = Partial<Text> & {
  uid: string;
  authors: AuthorNode[];
};
