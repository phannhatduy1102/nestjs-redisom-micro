import { Injectable } from '@nestjs/common';
import {
  CreateWriterGroupInput,
  MESSAGE_ERROR_CODE,
  QUERY_FAILED_ERROR_CODE,
  throwRpcError,
} from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';
import { QueryFailedError } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CreateWriterGroupUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: CreateWriterGroupInput) {
    try {
      return await this.writerGroupRepository.create(input);
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
