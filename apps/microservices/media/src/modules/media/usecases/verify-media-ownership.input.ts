import { VerifyMediaOwnershipInput } from '@v2-comic-be/core';
import { MediaRepository } from '../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyMediaOwnershipUsecase {
  constructor(private mediaRepository: MediaRepository) {}
  async execute(input: VerifyMediaOwnershipInput) {
    return await this.mediaRepository.verifyMediaOwnership(input);
  }
}
