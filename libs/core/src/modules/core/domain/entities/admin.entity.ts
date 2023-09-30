import { Column, Entity, ManyToOne } from 'typeorm';
import { MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from '../constants';
import { CommonEntity } from './common';
import { RoleEntity } from './role.entity';

@Entity({ name: 'admin' })
export class AdminEntity extends CommonEntity {
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  nickname!: string | null;

  @Column({ default: false })
  isBanned!: boolean;

  @Column({ length: MAX_NAME_LENGTH, nullable: true })
  name!: string | null;

  @Column({ length: MAX_DESCRIPTION_LENGTH })
  bannedReason!: string;

  @Column({
    nullable: true,
  })
  coverImage!: string | null;

  @Column({ default: false })
  isAdmin!: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.admin)
  role!: RoleEntity;
}
