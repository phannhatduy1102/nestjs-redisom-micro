import { Injectable } from '@nestjs/common';
import { EnsureEpisodeNumberExistInput } from '@v2-comic-be/core';
import { MediaRepository } from '../repositories';

@Injectable()
export class EnsureEpisodeNumberExistUsecase {
  constructor(private mediaRepository: MediaRepository) {}

  async execute(input: EnsureEpisodeNumberExistInput) {
    return await this.mediaRepository.ensureEpisodeNumberExist(input);
  }
}
