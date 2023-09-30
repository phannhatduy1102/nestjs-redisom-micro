import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleInput, RoleMessage } from '@v2-comic-be/core';

@Controller()
export class RoleController {
  @MessagePattern(RoleMessage.GetList)
  async getRoles(@Payload() payload: any) {
    return 'client login';
  }

  @MessagePattern(RoleMessage.Create)
  async createRole(@Payload() payload: CreateRoleInput) {
    //
  }
}
