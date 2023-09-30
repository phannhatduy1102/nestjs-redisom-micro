import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from '../constants';
import { CommonEntity } from './common';
import { MediaEntity } from './media.entity';

@Entity({ name: 'series' })
export class SeriesEntity extends CommonEntity {
  @Column({ unique: true })
  slug!: string;

  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column({
    nullable: true,
  })
  coverImage!: string | null;

  @ApiPropertyOptional()
  @Column({ nullable: true, length: MAX_DESCRIPTION_LENGTH })
  description!: string;

  @OneToMany(() => MediaEntity, (media) => media.series)
  media!: MediaEntity[];
}
