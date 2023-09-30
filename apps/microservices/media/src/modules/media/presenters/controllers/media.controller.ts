import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEpisodeInput,
  CreateMediaInput,
  EnsureEpisodeNumberExistInput,
  MediaMessage,
  UpdateMediaInput,
  VerifyMediaOwnershipInput,
} from '@v2-comic-be/core';
import { GetMediaByIdInput } from '../../domain';
import {
  CreateEpisodeUsecase,
  CreateMediaUsecase,
  EnsureEpisodeNumberExistUsecase,
  GetMediaByIdUsecase,
  GetMediaUsecase,
  UpdateMediaUsecase,
  VerifyMediaOwnershipUsecase,
} from '../../usecases';

@Controller()
export class MediaController {
  constructor(
    private getMediaByIdUseCase: GetMediaByIdUsecase,
    private createMediaUseCase: CreateMediaUsecase,
    private getMediaUseCase: GetMediaUsecase,
    private verifyOwnershipUsecase: VerifyMediaOwnershipUsecase,
    private updateMediaUseCase: UpdateMediaUsecase,
    private createEpisodeUsecase: CreateEpisodeUsecase,
    private ensureEpisodeNumberExistUsecase: EnsureEpisodeNumberExistUsecase
  ) {}

  //TODO - Not implemented yet
  @MessagePattern(MediaMessage.Get)
  async get(@Payload() input: GetMediaByIdInput) {
    return this.getMediaByIdUseCase.execute(input);
  }

  @MessagePattern(MediaMessage.Update)
  async update(@Payload() input: UpdateMediaInput) {
    return this.updateMediaUseCase.execute(input);
  }

  //TODO - Not implemented yet
  @MessagePattern(MediaMessage.GetList)
  async getList() {
    return this.getMediaUseCase.execute();
  }

  @MessagePattern(MediaMessage.Create)
  async create(@Payload() input: CreateMediaInput) {
    return this.createMediaUseCase.execute(input);
  }

  @MessagePattern(MediaMessage.VerifyOwnership)
  async verifyOwnership(@Payload() input: VerifyMediaOwnershipInput) {
    return this.verifyOwnershipUsecase.execute(input);
  }

  @MessagePattern(MediaMessage.CreateEpisode)
  async createEpisode(@Payload() input: CreateEpisodeInput) {
    return this.createEpisodeUsecase.execute(input);
  }

  @MessagePattern(MediaMessage.EnsureEpisodeNumberExist)
  async ensureEpisodeNumberExist(
    @Payload() input: EnsureEpisodeNumberExistInput
  ) {
    return this.ensureEpisodeNumberExistUsecase.execute(input);
  }
}
