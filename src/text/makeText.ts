import { Text } from '../common/types';
import { TextNode } from './types';
import { makeAuthor, AuthorNode } from '../author';

export function makeText(node: TextNode): Text {
  const { uid: id, title = null, url = null, authors = [], subject = [], xid = null, source = null } = node;

  return {
    id,
    xid,
    source,
    title,
    url,
    subject,
    authors: authors.map((a: AuthorNode) => makeAuthor(a)),
  };
}
