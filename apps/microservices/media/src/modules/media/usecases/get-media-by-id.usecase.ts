import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repositories';
import { GetMediaByIdInput } from '../domain';

@Injectable()
export class GetMediaByIdUsecase {
  constructor(private mediaRepository: MediaRepository) {}
  async execute(input: GetMediaByIdInput) {
    return await this.mediaRepository.getById(input);
  }
}
