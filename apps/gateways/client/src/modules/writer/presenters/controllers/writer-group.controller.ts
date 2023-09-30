import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  AddEditMediaPermissionInput,
  AddMemberToWriterGroupInput,
  CreateWriterGroupInput,
  DeleteEditMediaPermissionInput,
  DeleteWriterGroupInput,
  DeleteWriterGroupMembersInput,
  EnsureMembersExist,
  FastifyRequestWithAuth,
  GatewayAddEditMediaPermissionInput,
  GatewayAddMemberToWriterGroupInput,
  GatewayDeleteEditMediaPermissionInput,
  GatewayDeleteWriterGroupInput,
  GatewayDeleteWriterGroupMembersInput,
  GatewayUpdateWriterGroupInput,
  GetWriterGroupMembersInput,
  IdFieldInput,
  UpdateWriterGroupInput,
  UserDecorator,
  WriterClientProviderOptions,
  WriterGroupMessage,
  createIdMapObjects,
} from '@v2-comic-be/core';
import {
  JwtAuthGuard,
  VerifyMediaOwnershipGuard,
  VerifyWriterGroupOwnershipGuard,
} from '../../../../guards';

@ApiTags('writer/group')
@Controller('writer/group')
@UseGuards(JwtAuthGuard)
export class WriterGroupController {
  constructor(
    @Inject(WriterClientProviderOptions.name)
    private readonly writerMicroservice: ClientProxy
  ) {}

  @Get()
  async get() {
    return 'writer';
  }

  @Post()
  create(
    @Body() data: CreateWriterGroupInput,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    const input = { ...data, owner: { id: user.id } };
    return this.writerMicroservice.send<unknown, CreateWriterGroupInput>(
      WriterGroupMessage.Create,
      input
    );
  }

  @UseGuards(VerifyWriterGroupOwnershipGuard)
  @Put(':id')
  update(
    @Param() params: IdFieldInput,
    @Body() data: GatewayUpdateWriterGroupInput
  ) {
    const input: UpdateWriterGroupInput = { ...data, id: params.id };
    return this.writerMicroservice.send<unknown, UpdateWriterGroupInput>(
      WriterGroupMessage.Update,
      input
    );
  }

  @UseGuards(VerifyWriterGroupOwnershipGuard)
  @Post(':id/members')
  addMembers(
    @Param() params: IdFieldInput,
    @Body() data: GatewayAddMemberToWriterGroupInput,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    const input: AddMemberToWriterGroupInput = {
      writers: createIdMapObjects(data.ids),
      group: { id: params.id },
      owner: { id: user.id },
    };

    return this.writerMicroservice.send<unknown, AddMemberToWriterGroupInput>(
      WriterGroupMessage.AddMembers,
      input
    );
  }

  //TODO - not working
  @UseGuards(VerifyWriterGroupOwnershipGuard)
  @Get('/ensure-members-exist')
  ensureMembersExist(
    @Body() data: EnsureMembersExist,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    const input = { ...data, owner: { id: user.id } };
    return this.writerMicroservice.send<unknown, EnsureMembersExist>(
      WriterGroupMessage.EnsureMembersExist,
      input
    );
  }

  @UseGuards(VerifyWriterGroupOwnershipGuard)
  @Get(':id/members')
  async getMembers(
    @Param() params: IdFieldInput,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    return this.writerMicroservice.send<unknown, GetWriterGroupMembersInput>(
      WriterGroupMessage.GetMembers,
      { groupId: params.id, ownerId: user.id }
    );
  }

  @UseGuards(VerifyWriterGroupOwnershipGuard, VerifyMediaOwnershipGuard)
  @Post(':id/add-edit-media-permission')
  addEditMediaPermission(
    @Param() params: IdFieldInput,
    @Body() data: GatewayAddEditMediaPermissionInput,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    const input: AddEditMediaPermissionInput = {
      media: createIdMapObjects(data.mediaIds),
      group: { id: params.id },
      owner: { id: user.id },
    };

    return this.writerMicroservice.send<unknown, AddEditMediaPermissionInput>(
      WriterGroupMessage.AddEditMediaPermission,
      input
    );
  }

  @UseGuards(VerifyWriterGroupOwnershipGuard)
  @Delete(':id/delete-edit-media-permission')
  deleteEditMediaPermission(
    @Param() params: IdFieldInput,
    @Body() data: GatewayDeleteEditMediaPermissionInput,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    const input: DeleteEditMediaPermissionInput = {
      ids: data.ids,
      ownerId: user.id,
    };

    return this.writerMicroservice.send<
      unknown,
      DeleteEditMediaPermissionInput
    >(WriterGroupMessage.DeleteEditMediaPermission, input);
  }

  @UseGuards(VerifyWriterGroupOwnershipGuard)
  @Delete(':id/members')
  deleteMembers(
    @Param() params: IdFieldInput,
    @Body() data: GatewayDeleteWriterGroupMembersInput,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    const input: DeleteWriterGroupMembersInput = {
      memberIds: data.ids,
      ownerId: user.id,
      groupId: params.id,
    };

    return this.writerMicroservice.send<unknown, DeleteWriterGroupMembersInput>(
      WriterGroupMessage.DeleteMembers,
      input
    );
  }

  @UseGuards(VerifyWriterGroupOwnershipGuard)
  @Delete()
  delete(
    @Body() data: GatewayDeleteWriterGroupInput,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    const input: DeleteWriterGroupInput = {
      writerGroupIds: data.groupIds,
      ownerId: user.id,
    };

    return this.writerMicroservice.send<unknown, DeleteWriterGroupInput>(
      WriterGroupMessage.Delete,
      input
    );
  }
}
