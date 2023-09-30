import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateWriterInput,
  MESSAGE_ERROR_CODE,
  QUERY_FAILED_ERROR_CODE,
  throwRpcError,
} from '@v2-comic-be/core';
import { WriterRepository } from '../repositories';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class CreateWriterUsecase {
  constructor(private writerRepository: WriterRepository) {}

  async execute(input: CreateWriterInput) {
    try {
      await this.writerRepository.create(input);
      return true;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === QUERY_FAILED_ERROR_CODE.UNIQUE_VIOLATION
      ) {
        throwRpcError(MESSAGE_ERROR_CODE.EMAIL_IS_EXIST);
      }
      throw new RpcException(error);
    }
  }
}
