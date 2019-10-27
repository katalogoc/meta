import { Author } from '../common/types';
import { AuthorNode, AliasNode } from './types';

export function makeAuthor(node: Partial<AuthorNode>): Author {
  const { uid: id, name = null, birthdate = null, deathdate = null, alias = [], thumbnail = null, texts = [] } = node;

  return {
    id,
    name,
    birthdate,
    deathdate,
    thumbnail,
    texts,
    alias: alias.map((a: AliasNode) => a.value),
  };
}
