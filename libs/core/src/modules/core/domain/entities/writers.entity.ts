import { Column, Entity, OneToMany } from 'typeorm';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_NUMBER_LENGTH,
} from '../constants';
import { CommonEntity } from './common';
import { MediaEntity } from './media.entity';
import { WriterGroupMemberEntity } from './writer-group-member.entity';
import { WriterGroupEntity } from './writer-group.entity';

@Entity({ name: 'writers' })
export class WriterEntity extends CommonEntity {
  @Column({ unique: true, nullable: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: false })
  isVerifiedEmail!: boolean;

  @Column({ nullable: true })
  nickname!: string | null;

  @Column({ length: MAX_NAME_LENGTH, nullable: true })
  name!: string;

  @Column({ default: false })
  isBanned!: boolean;

  @Column({ length: MAX_DESCRIPTION_LENGTH, nullable: true })
  bannedReason!: string | null;

  @Column({ nullable: true, length: MAX_PHONE_NUMBER_LENGTH, default: null })
  phoneNumber!: string | null;

  @Column({ default: false })
  isVerifiedPhoneNumber!: boolean;

  @Column({
    nullable: true,
  })
  avatar!: string | null;

  @OneToMany(
    () => WriterGroupMemberEntity,
    (writerGroupMember) => writerGroupMember.writer
  )
  writerGroupMembers!: WriterGroupMemberEntity[];

  @OneToMany(() => WriterGroupEntity, (writerGroup) => writerGroup.owner)
  writerGroupOwners!: WriterGroupEntity[];

  @OneToMany(() => MediaEntity, (media) => media.postedBy)
  media!: MediaEntity[];
}
