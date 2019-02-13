import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export default class Text extends Model<Text> {
  @Column({ primaryKey: true, type: DataType.STRING })
  id: string;

  @Column(DataType.STRING)
  url: string;
}
