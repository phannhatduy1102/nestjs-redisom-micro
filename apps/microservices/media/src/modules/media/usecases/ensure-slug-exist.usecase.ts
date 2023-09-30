import { Injectable } from '@nestjs/common';
import { MediaEnsureSlugExistInput } from '@v2-comic-be/core';
import { MediaRepository } from '../repositories';

@Injectable()
export class EnsureSlugExistUsecase {
  constructor(private mediaRepository: MediaRepository) {}

  async execute(input: MediaEnsureSlugExistInput) {
    return await this.mediaRepository.ensureSlugExist(input.slug);
  }
}
