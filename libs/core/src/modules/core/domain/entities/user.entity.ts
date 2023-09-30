import { Column, Entity, OneToMany } from 'typeorm';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_NUMBER_LENGTH,
} from '../constants';
import { CommentEntity } from './comment.entity';
import { CommonEntity } from './common';
import { MediaFollowerEntity } from './media-follower.entity';
import { RatingEntity } from './rating.entity';
import { ViewingHistoryEntity } from './viewing-history.entity';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: false })
  isVerifyEmail!: boolean;

  @Column({ nullable: true })
  nickname!: string | null;

  @Column({ default: false })
  isBanned!: boolean;

  @Column({ length: MAX_NAME_LENGTH, nullable: true })
  name!: string;

  @Column({ length: MAX_DESCRIPTION_LENGTH, nullable: true })
  bannedReason!: string | null;

  @Column({
    nullable: true,
  })
  avatar!: string | null;

  @Column({ nullable: true, length: MAX_PHONE_NUMBER_LENGTH, default: null })
  phoneNumber!: string | null;

  @Column({ default: false })
  isVerifyPhoneNumber!: boolean;

  @OneToMany(() => MediaFollowerEntity, (mediaFollower) => mediaFollower.media)
  mediaFollower!: MediaFollowerEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings!: RatingEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comment!: CommentEntity[];

  @OneToMany(
    () => ViewingHistoryEntity,
    (viewingHistory) => viewingHistory.user
  )
  viewingHistories!: ViewingHistoryEntity[];
}
