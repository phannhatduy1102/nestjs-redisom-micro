import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  DEFAULT_RATING,
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  MIN_NUMBER,
} from '../constants';
import { CommentEntity } from './comment.entity';
import { CommonEntity } from './common';
import { CountryEntity } from './country.entity';
import { GenreEntity } from './genre.entity';
import { MediaEditPermissionEntity } from './media-edit-permission.entity';
import { MediaFollowerEntity } from './media-follower.entity';
import { RatingEntity } from './rating.entity';
import { SeriesEntity } from './series.entity';
import { ViewingHistoryEntity } from './viewing-history.entity';
import { WriterEntity } from './writers.entity';

@Entity('media')
export class MediaEntity extends CommonEntity {
  @Column({ unique: true, type: 'varchar', length: MAX_NAME_LENGTH })
  slug!: string | null;

  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column({ nullable: true })
  otherName!: string;

  @Column({ nullable: true, length: MAX_DESCRIPTION_LENGTH })
  description!: string;

  @Column()
  coverImage!: string;

  @Column({ default: MIN_NUMBER })
  lastedEpisode!: number;

  @Column({ default: MIN_NUMBER })
  viewed!: number;

  @Column({ nullable: true })
  yop!: number;

  @Column({ type: 'float', default: DEFAULT_RATING })
  totalRating!: number;

  @Column({ default: MIN_NUMBER })
  ratingCount!: number;

  @Column({ type: 'timestamp', nullable: true })
  releaseDate!: Date | null;

  @Column({ default: true })
  isFree!: boolean;

  @Column({ type: 'float', default: MIN_NUMBER })
  price!: number;

  @Column({ type: 'float', default: MIN_NUMBER })
  pricePerEpisode!: number;

  @Column()
  author!: string;

  @Column({ default: MIN_NUMBER })
  followerCount!: number;

  @Column({ type: 'varchar' })
  type!: string;

  @OneToMany(() => MediaFollowerEntity, (mediaFollower) => mediaFollower.media)
  mediaFollower!: MediaFollowerEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.media)
  ratings: RatingEntity[];

  @OneToMany(() => MediaEditPermissionEntity, (item) => item.media)
  mediaEditPermission: MediaEditPermissionEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.media)
  comment!: CommentEntity[];

  @OneToMany(
    () => ViewingHistoryEntity,
    (viewingHistory) => viewingHistory.media
  )
  viewingHistories!: ViewingHistoryEntity[];

  @ManyToMany(() => GenreEntity, {
    cascade: true,
  })
  @JoinTable()
  genre!: GenreEntity[];

  @ManyToOne(() => CountryEntity, (country) => country.media)
  country!: CountryEntity;

  @ManyToOne(() => WriterEntity, (writer) => writer.media)
  postedBy!: WriterEntity;

  @ManyToOne(() => SeriesEntity, (series) => series.media)
  series!: SeriesEntity;
}
