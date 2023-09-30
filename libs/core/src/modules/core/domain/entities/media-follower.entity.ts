import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common';
import { MediaEntity } from './media.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'media_followers' })
export class MediaFollowerEntity extends CommonEntity {
  @Column({ type: 'boolean', default: false })
  isNotificationEnable!: number;

  @ManyToOne(() => MediaEntity, (media) => media.mediaFollower)
  media!: MediaEntity;

  @ManyToOne(() => UserEntity, (user) => user.mediaFollower)
  user!: UserEntity;
}
