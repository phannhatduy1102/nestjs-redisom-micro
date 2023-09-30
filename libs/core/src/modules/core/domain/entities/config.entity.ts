import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common';

@Entity({ name: 'config' })
export class ConfigEntity extends CommonEntity {
  @Column({ unique: true })
  key: string;

  @Column()
  value: string;
}
