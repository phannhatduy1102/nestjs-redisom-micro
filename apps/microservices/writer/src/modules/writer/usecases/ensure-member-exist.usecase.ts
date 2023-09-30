import { Injectable } from '@nestjs/common';
import { EnsureMembersExist } from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';

@Injectable()
export class EnsureMembersExistUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: EnsureMembersExist) {
    return await this.writerGroupRepository.ensureMembersExist(input);
  }
}
