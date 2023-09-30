import { Injectable } from '@nestjs/common';
import {
  AddMemberToWriterGroupInput,
  MESSAGE_ERROR_CODE,
  createIdMapObjects,
  destructIds,
  filterOutExistingItems,
  throwRpcError,
} from '@v2-comic-be/core';
import { WriterGroupRepository, WriterRepository } from '../repositories';

@Injectable()
export class AddMemberToWriterGroupUsecase {
  constructor(
    private writerGroupRepository: WriterGroupRepository,
    private writerRepository: WriterRepository
  ) {}

  async execute(input: AddMemberToWriterGroupInput) {
    const { owner, writers } = input;

    const destructedWriterIds = filterOutExistingItems(destructIds(writers), [
      owner.id,
    ]);

    if (destructedWriterIds.length === 0) {
      throwRpcError(MESSAGE_ERROR_CODE.WRITER_ALREADY_IN_GROUP);
    }

    const isWriterExist = await this.writerRepository.ensureWritersExist({
      ids: destructedWriterIds,
    });

    if (!isWriterExist) {
      throwRpcError(MESSAGE_ERROR_CODE.NOT_FOUND_WRITER);
    }

    const modifiedInput = {
      ...input,
      writers: createIdMapObjects(destructedWriterIds),
    };

    return await this.writerGroupRepository.addMembers(modifiedInput);
  }
}
