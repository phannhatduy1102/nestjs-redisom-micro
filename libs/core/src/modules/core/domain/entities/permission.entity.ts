import { Column, Entity, ManyToOne } from 'typeorm';
import { MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from '../constants';
import { CommonEntity } from './common';
import { PermissionGroupEntity } from './permission-group.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends CommonEntity {
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

  @ManyToOne(
    () => PermissionGroupEntity,
    (permissionGroup) => permissionGroup.permissions
  )
  permissionGroup!: PermissionGroupEntity;

  @ManyToOne(() => RoleEntity)
  role!: RoleEntity;
}
