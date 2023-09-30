import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { StatusEnum } from '../constants';
import { MediaEntity } from './media.entity';
import { WriterGroupEntity } from './writer-group.entity';

@Entity({ name: 'media_edit_permission' })
@Unique('unique_media_edit_permission_media_id', ['mediaId'])
export class MediaEditPermissionEntity {
  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id: string;

  @PrimaryColumn({ type: 'uuid', name: 'media_id' })
  mediaId!: string;

  @ManyToOne(() => MediaEntity, (media) => media.mediaEditPermission)
  @JoinColumn({ name: 'media_id' })
  media!: MediaEntity;

  @PrimaryColumn({ type: 'uuid', name: 'writer_group_id' })
  writerGroupId!: string;

  @ManyToOne(() => WriterGroupEntity, (group) => group.mediaEditPermission, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'writer_group_id' })
  writerGroup!: WriterGroupEntity;

  @Column({ type: 'varchar', default: StatusEnum.Active })
  status!: StatusEnum;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt!: Date | null;
}
