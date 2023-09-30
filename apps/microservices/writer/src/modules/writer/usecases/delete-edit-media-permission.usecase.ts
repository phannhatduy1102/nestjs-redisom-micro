import { Injectable } from '@nestjs/common';
import {
  DeleteEditMediaPermissionInput,
  MESSAGE_ERROR_CODE,
  throwRpcError,
} from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';

@Injectable()
export class DeleteEditMediaPermissionUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: DeleteEditMediaPermissionInput) {
    try {
      await this.writerGroupRepository.deleteEditMediaPermission(input);
      return true;
    } catch (error) {
      throwRpcError(MESSAGE_ERROR_CODE.NOT_FOUND_MEDIA);
    }
  }
}
