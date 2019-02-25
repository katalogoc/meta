import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Text } from './Text';
import { TextAuthor } from './TextAuthor';

export interface AuthorInterface {
  id?: string;
  name: string;
  alias: string;
  birthdate: number;
  deathdate: number | null;
}

@Table
export default class Author extends Model<Author> implements AuthorInterface {
  @Column({ primaryKey: true, type: DataType.STRING })
  public id?: string;

  @BelongsToMany(() => Text, () => TextAuthor)
  public texts: Text[];

  @Column(DataType.STRING)
  public name: string;

  @Column(DataType.STRING)
  public alias: string;

  @Column(DataType.INTEGER)
  public birthdate: number;

  @Column(DataType.INTEGER)
  public deathdate: number | null;
}
