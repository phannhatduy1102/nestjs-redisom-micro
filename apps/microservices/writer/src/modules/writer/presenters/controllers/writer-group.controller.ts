import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddEditMediaPermissionInput,
  AddMemberToWriterGroupInput,
  CreateWriterGroupInput,
  DeleteEditMediaPermissionInput,
  DeleteWriterGroupInput,
  DeleteWriterGroupMembersInput,
  EnsureMediaInGroupExistInput,
  EnsureMembersExist,
  GetWriterGroupMembersInput,
  UpdateWriterGroupInput,
  VerifyEditMediaPermissionInput,
  VerifyWriterGroupOwnershipInput,
  WriterGroupMessage,
} from '@v2-comic-be/core';
import {
  AddEditMediaPermissionUsecase,
  AddMemberToWriterGroupUsecase,
  CreateWriterGroupUsecase,
  DeleteEditMediaPermissionUsecase,
  DeleteWriterGroupMembersUsecase,
  DeleteWriterGroupUsecase,
  EnsureMediaInGroupExistUsecase,
  EnsureMembersExistUsecase,
  GetWriterGroupMembersUsecase,
  UpdateWriterGroupUsecase,
  VerifyEditMediaPermissionUsecase,
  VerifyWriterGroupOwnershipUsecase,
} from '../../usecases';

@Controller()
export class WriterGroupController {
  constructor(
    private createWriterGroupUseCase: CreateWriterGroupUsecase,
    private addMemberToWriterGroupUseCase: AddMemberToWriterGroupUsecase,
    private ensureMembersExistUsecase: EnsureMembersExistUsecase,
    private getWriterGroupMembersUsecase: GetWriterGroupMembersUsecase,
    private verifyWriterGroupOwnershipUsecase: VerifyWriterGroupOwnershipUsecase,
    private addEditMediaPermissionUsecase: AddEditMediaPermissionUsecase,
    private deleteEditMediaPermissionUsecase: DeleteEditMediaPermissionUsecase,
    private deleteWriterGroupMembersUsecase: DeleteWriterGroupMembersUsecase,
    private deleteWriterGroupUsecase: DeleteWriterGroupUsecase,
    private updateWriterGroupUsecase: UpdateWriterGroupUsecase,
    private verifyEditMediaPermissionUsecase: VerifyEditMediaPermissionUsecase,
    private ensureMediaInGroupExistUsecase: EnsureMediaInGroupExistUsecase
  ) {}

  @MessagePattern(WriterGroupMessage.Create)
  async getByEmail(@Payload() payload: CreateWriterGroupInput) {
    return this.createWriterGroupUseCase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.Delete)
  async delete(@Payload() payload: DeleteWriterGroupInput) {
    return this.deleteWriterGroupUsecase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.Update)
  async update(@Payload() payload: UpdateWriterGroupInput) {
    return this.updateWriterGroupUsecase.execute(payload);
  }

  // SECTION Group Member

  @MessagePattern(WriterGroupMessage.AddMembers)
  async addMembers(@Payload() payload: AddMemberToWriterGroupInput) {
    return this.addMemberToWriterGroupUseCase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.EnsureMembersExist)
  async ensureMembersExist(@Payload() payload: EnsureMembersExist) {
    return this.ensureMembersExistUsecase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.GetMembers)
  async getMembers(@Payload() payload: GetWriterGroupMembersInput) {
    return this.getWriterGroupMembersUsecase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.VerifyWriterGroupOwnership)
  async verifyOwnership(@Payload() payload: VerifyWriterGroupOwnershipInput) {
    return this.verifyWriterGroupOwnershipUsecase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.DeleteMembers)
  async deleteMembers(@Payload() payload: DeleteWriterGroupMembersInput) {
    return this.deleteWriterGroupMembersUsecase.execute(payload);
  }

  //!SECTION

  // SECTION Edit Media Permission

  @MessagePattern(WriterGroupMessage.AddEditMediaPermission)
  async addEditMediaPermission(
    @Payload() payload: AddEditMediaPermissionInput
  ) {
    return this.addEditMediaPermissionUsecase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.DeleteEditMediaPermission)
  async deleteEditMediaPermission(
    @Payload() payload: DeleteEditMediaPermissionInput
  ) {
    return this.deleteEditMediaPermissionUsecase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.VerifyEditMediaPermission)
  async verifyEditMediaPermission(
    @Payload() payload: VerifyEditMediaPermissionInput
  ) {
    return this.verifyEditMediaPermissionUsecase.execute(payload);
  }

  @MessagePattern(WriterGroupMessage.EnsureMediaInGroupExist)
  async ensureMediaInGroupExist(
    @Payload() payload: EnsureMediaInGroupExistInput
  ) {
    return this.ensureMediaInGroupExistUsecase.execute(payload);
  }

  // !SECTION
}
