import { Injectable } from '@nestjs/common';
import {
  AddEditMediaPermissionInput,
  MESSAGE_ERROR_CODE,
  destructIds,
  throwRpcError,
} from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';

@Injectable()
export class AddEditMediaPermissionUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: AddEditMediaPermissionInput) {
    const mediaExistInGroup =
      await this.writerGroupRepository.ensureMediaInGroupExist({
        ids: destructIds(input.media),
      });

    if (mediaExistInGroup.ids.length > 0) {
      throwRpcError(MESSAGE_ERROR_CODE.MEDIA_ALREADY_IN_GROUP);
    }
    return await this.writerGroupRepository.addEditMediaPermission(input);
  }
}
