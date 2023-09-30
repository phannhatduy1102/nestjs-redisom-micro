import { Injectable } from '@nestjs/common';
import { EnsureMediaInGroupExistInput } from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';

@Injectable()
export class EnsureMediaInGroupExistUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: EnsureMediaInGroupExistInput) {
    return await this.writerGroupRepository.ensureMediaInGroupExist(input);
  }
}
