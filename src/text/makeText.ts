import { Text } from '../common/types';
import { TextNode } from './types';

export function makeText(node: TextNode): Text {
  const { uid: id, title = null, url = null, authors = [], subject = [] } = node;

  return {
    id,
    title,
    url,
    authors,
    subject,
  };
}
