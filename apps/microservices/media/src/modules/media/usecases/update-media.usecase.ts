import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  MESSAGE_ERROR_CODE,
  QUERY_FAILED_ERROR_CODE,
  UpdateMediaInput,
  removeAllUndefinedOrNull,
  throwRpcError,
} from '@v2-comic-be/core';
import { QueryFailedError } from 'typeorm';
import { MediaRepository } from '../repositories';

@Injectable()
export class UpdateMediaUsecase {
  constructor(private mediaRepository: MediaRepository) {}

  async execute(input: UpdateMediaInput) {
    try {
      await this.mediaRepository.update(removeAllUndefinedOrNull(input, true));
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
