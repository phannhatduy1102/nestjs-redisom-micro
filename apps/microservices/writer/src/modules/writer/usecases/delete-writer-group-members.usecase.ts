import { Injectable } from '@nestjs/common';
import { DeleteWriterGroupMembersInput } from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DeleteWriterGroupMembersUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: DeleteWriterGroupMembersInput) {
    try {
      await this.writerGroupRepository.deleteMembers(input);
      return true;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
