import { Column, Entity, ManyToOne } from 'typeorm';
import { MAX_COMMENT_LENGTH, MIN_NUMBER } from '../constants';
import { CommonEntity } from './common';
import { MediaEntity } from './media.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends CommonEntity {
  @Column({ length: MAX_COMMENT_LENGTH })
  content!: string;

  @Column({ default: MIN_NUMBER })
  likeCount!: number;

  @Column({ type: 'uuid', nullable: true, default: null })
  parentId!: string;

  @Column()
  episodeNumber!: number;

  @Column({ type: 'simple-array', default: [] })
  liked!: string[];

  @ManyToOne(() => MediaEntity, (media) => media.comment)
  media!: MediaEntity;

  @ManyToOne(() => UserEntity, (user) => user.comment)
  user!: UserEntity;
}
