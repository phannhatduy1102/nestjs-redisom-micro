import { Column, Entity, OneToMany } from 'typeorm';
import { MAX_DESCRIPTION_LENGTH, MAX_NAME_LENGTH } from '../constants';
import { AdminEntity } from './admin.entity';
import { CommonEntity } from './common';

@Entity({ name: 'roles' })
export class RoleEntity extends CommonEntity {
  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column({
    nullable: true,
  })
  coverImage!: string | null;

  @Column({ nullable: true, length: MAX_DESCRIPTION_LENGTH })
  description!: string | null;

  @OneToMany(() => AdminEntity, (admin) => admin.role)
  admin!: AdminEntity[];
}
