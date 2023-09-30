import { Column, Entity, OneToMany } from 'typeorm';
import { MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from '../constants';
import { CommonEntity } from './common';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'permission-groups' })
export class PermissionGroupEntity extends CommonEntity {
  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({
    nullable: true,
  })
  coverImage!: string | null;

  @Column({ nullable: true, length: MAX_DESCRIPTION_LENGTH })
  description!: string | null;

  @OneToMany(() => PermissionEntity, (permission) => permission.permissionGroup)
  permissions: PermissionEntity[];
}
