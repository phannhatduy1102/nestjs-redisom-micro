import { Module } from '@nestjs/common';
import { RoleController } from './presenters';

@Module({
  controllers: [RoleController],
  providers: [],
})
export class Role {}
