import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  MediaTypeEnum,
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  MIN_PRICE,
  MIN_NUMBER,
} from '../constants';
import { CommonEntity } from './common';
import { MediaEntity } from './media.entity';
import { ViewingHistoryEntity } from './viewing-history.entity';
import { EpisodeImage, EpisodeVideo } from '../types';

@Entity({ name: 'episode' })
export class EpisodeEntity extends CommonEntity {
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

  @Column()
  episodeNumber!: number;

  @Column({ default: MediaTypeEnum.Text, type: 'varchar' })
  type!: MediaTypeEnum;

  @Column({ nullable: true })
  content!: string;

  @Column({ nullable: true, type: 'jsonb' })
  images!: EpisodeImage[];

  @Column({ nullable: true, type: 'jsonb' })
  videos!: EpisodeVideo[];

  @Column({ type: 'float', default: MIN_PRICE })
  price!: number;

  @Column({ type: 'int4', default: MIN_NUMBER })
  viewed!: number;

  @Column({ default: true })
  isFree!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  protectedTime!: Date;

  @ManyToOne(() => MediaEntity, (media) => media.id)
  media!: MediaEntity;

  @OneToMany(
    () => ViewingHistoryEntity,
    (viewingHistory) => viewingHistory.episode
  )
  viewingHistories!: ViewingHistoryEntity[];
}
