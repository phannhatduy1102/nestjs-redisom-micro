import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from '../constants';
import { CommonEntity } from './common';
import { MediaEditPermissionEntity } from './media-edit-permission.entity';
import { WriterGroupMemberEntity } from './writer-group-member.entity';
import { WriterEntity } from './writers.entity';

@Entity({ name: 'writer_groups' })
export class WriterGroupEntity extends CommonEntity {
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

  @ManyToOne(() => WriterEntity, (writer) => writer.writerGroupOwners)
  owner!: WriterEntity;

  @OneToMany(
    () => WriterGroupMemberEntity,
    (writerGroupMember) => writerGroupMember.writerGroup
  )
  writerGroupMembers!: WriterGroupMemberEntity[];

  @OneToMany(() => MediaEditPermissionEntity, (item) => item.writerGroup)
  mediaEditPermission!: MediaEditPermissionEntity[];
}
