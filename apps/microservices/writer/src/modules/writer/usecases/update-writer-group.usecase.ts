import { Injectable } from '@nestjs/common';
import {
  MESSAGE_ERROR_CODE,
  QUERY_FAILED_ERROR_CODE,
  UpdateWriterGroupInput,
  throwRpcError,
} from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';
import { QueryFailedError } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UpdateWriterGroupUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: UpdateWriterGroupInput) {
    try {
      await this.writerGroupRepository.update(input);
      return true;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === QUERY_FAILED_ERROR_CODE.UNIQUE_VIOLATION
      ) {
        throwRpcError(MESSAGE_ERROR_CODE.SLUG_IS_EXIST);
      }
      throw new RpcException(error);
    }
  }
}
