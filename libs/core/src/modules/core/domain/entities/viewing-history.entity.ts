import { Column, Entity, ManyToOne } from 'typeorm';
import { EpisodeEntity } from './episode.entity';
import { CommonEntity } from './common';
import { MediaEntity } from './media.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'viewing_histories' })
export class ViewingHistoryEntity extends CommonEntity {
  @Column()
  lastReadPosition!: number;

  @ManyToOne(() => UserEntity, (user) => user.viewingHistories)
  user!: UserEntity;

  @ManyToOne(() => EpisodeEntity, (episode) => episode.viewingHistories)
  episode!: EpisodeEntity;

  @ManyToOne(() => MediaEntity, (media) => media.viewingHistories)
  media!: MediaEntity;
}
