import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import Author from './Author';
import { TextAuthor } from './TextAuthor';

export interface TextInterface {
  id?: string;
  url: string;
  title: string;
  authors: Author[];
  format: string;
  type: string;
  languageId: string;
  issued: string;
}

@Table
export class Text extends Model<Text> implements TextInterface {
  @Column({ primaryKey: true, type: DataType.STRING })
  public id?: string;

  @Column(DataType.STRING)
  public url: string;

  @BelongsToMany(() => Author, () => TextAuthor)
  public authors: Author[];

  @Column(DataType.STRING)
  public title: string;

  @Column(DataType.STRING)
  public format: string;

  @Column(DataType.STRING)
  public type: string;

  @Column(DataType.STRING)
  public languageId: string;

  @Column(DataType.STRING)
  public issued: string;
}
