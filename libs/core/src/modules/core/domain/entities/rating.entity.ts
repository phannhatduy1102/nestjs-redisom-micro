import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DEFAULT_RATING } from '../constants';
import { CommonEntity } from './common';
import { MediaEntity } from './media.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'ratings' })
export class RatingEntity extends CommonEntity {
  @Column({ default: DEFAULT_RATING })
  score!: number;

  @ManyToOne(() => MediaEntity, (media) => media.ratings)
  @JoinColumn()
  media!: MediaEntity;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  @JoinColumn()
  user!: UserEntity;
}
