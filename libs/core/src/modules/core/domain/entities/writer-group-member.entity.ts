import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusEnum } from '../constants';
import { WriterGroupEntity } from './writer-group.entity';
import { WriterEntity } from './writers.entity';

@Entity({ name: 'writer_group_members' })
export class WriterGroupMemberEntity {
  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id!: string;

  @PrimaryColumn({ type: 'uuid' })
  writerGroupId!: string;

  @PrimaryColumn({ type: 'uuid' })
  writerId!: string;

  @ManyToOne(
    () => WriterGroupEntity,
    (writerGroup) => writerGroup.writerGroupMembers,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'writer_group_id' })
  writerGroup!: WriterGroupEntity;

  @ManyToOne(() => WriterEntity, (writer) => writer.writerGroupMembers)
  @JoinColumn({ name: 'writer_id' })
  writer!: WriterEntity;

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
