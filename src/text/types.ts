import { Text } from '../common/types';

export type TextNode = Partial<Text> & {
  uid: string;
};
