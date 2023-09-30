import { Column, Entity } from 'typeorm';
import { MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from '../constants';
import { CommonEntity } from './common';

@Entity({ name: 'genres' })
export class GenreEntity extends CommonEntity {
  @Column({ unique: true })
  slug!: string;

  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column({
    nullable: true,
  })
  coverImage!: string | null;

  @Column({ nullable: true, length: MAX_DESCRIPTION_LENGTH })
  description!: string | null;
}
