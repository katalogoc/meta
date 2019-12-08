import { escapeString } from './escapeString';

export interface FilterOperation {
  type: string;
  field: string;
  value: string;
}

export function dgraphFilter(operations: FilterOperation[] = []): string {
  return `@filter(${operations.map(({ type, field, value }: FilterOperation) => `${type}(${field}, "${escapeString(value)}")`)})`;
}
