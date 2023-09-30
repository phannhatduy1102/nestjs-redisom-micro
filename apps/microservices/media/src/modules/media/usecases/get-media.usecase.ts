import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repositories';

@Injectable()
export class GetMediaUsecase {
  constructor(private mediaRepository: MediaRepository) {}
  async execute() {
    return await this.mediaRepository.get();
  }
}
