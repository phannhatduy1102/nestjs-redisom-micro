import { Injectable } from '@nestjs/common';
import { WriterGroupRepository } from '../repositories';
import { VerifyWriterGroupOwnershipInput } from '@v2-comic-be/core';

@Injectable()
export class VerifyWriterGroupOwnershipUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: VerifyWriterGroupOwnershipInput) {
    return await this.writerGroupRepository.verifyWriterGroupOwnership(input);
  }
}
