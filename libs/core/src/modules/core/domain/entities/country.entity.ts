import { Column, Entity, OneToMany } from 'typeorm';
import { MAX_NAME_LENGTH } from '../constants';
import { CommonEntity } from './common';
import { MediaEntity } from './media.entity';

@Entity({ name: 'countries' })
export class CountryEntity extends CommonEntity {
  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column({
    nullable: true,
  })
  coverImage!: string | null;

  @OneToMany(() => MediaEntity, (media) => media.country)
  media!: MediaEntity[];
}
