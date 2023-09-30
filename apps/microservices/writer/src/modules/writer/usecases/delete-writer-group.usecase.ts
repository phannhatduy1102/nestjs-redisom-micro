import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DeleteWriterGroupInput } from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';

@Injectable()
export class DeleteWriterGroupUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: DeleteWriterGroupInput) {
    try {
      await this.writerGroupRepository.delete(input);
      return true;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
