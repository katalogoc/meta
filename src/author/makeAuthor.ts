import { Author } from '../common/types';
import { AuthorNode } from './types';
import { makeText, TextNode } from '../text';

export function makeAuthor(node: Partial<AuthorNode>): Author {
  const {
    uid: id,
    name = null,
    birthdate = null,
    deathdate = null,
    alias = [],
    thumbnail = null,
    texts = [],
    xid = null,
    source = null,
  } = node;

  return {
    id,
    xid,
    source,
    name,
    birthdate,
    deathdate,
    thumbnail,
    alias,
    texts: texts.map((t: TextNode) => makeText(t)),
  };
}
