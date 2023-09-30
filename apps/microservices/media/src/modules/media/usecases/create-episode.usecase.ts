import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateEpisodeInput,
  MESSAGE_ERROR_CODE,
  QUERY_FAILED_ERROR_CODE,
  throwRpcError,
} from '@v2-comic-be/core';
import { MediaRepository } from '../repositories';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class CreateEpisodeUsecase {
  constructor(private mediaRepository: MediaRepository) {}

  async execute(input: CreateEpisodeInput) {
    const isExistEpisodeNumber =
      await this.mediaRepository.ensureEpisodeNumberExist({
        mediaId: input.mediaId,
        episodeNumber: input.episodeNumber,
      });

    if (isExistEpisodeNumber) {
      throwRpcError(MESSAGE_ERROR_CODE.EPISODE_NUMBER_IS_EXIST);
    }

    try {
      return await this.mediaRepository.createEpisode(input);
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
