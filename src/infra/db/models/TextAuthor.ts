import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import Author from './Author';
import { Text } from './Text';

export interface TextAuthorInterface {
  textId: string;
  authorId: string;
}

@Table
export class TextAuthor extends Model<TextAuthor> implements TextAuthorInterface {
  @ForeignKey(() => Text)
  @Column
  public textId: string;

  @ForeignKey(() => Author)
  @Column
  public authorId: string;
}
