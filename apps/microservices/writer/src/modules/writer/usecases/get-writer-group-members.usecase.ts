import { Injectable } from '@nestjs/common';
import { GetWriterGroupMembersInput } from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';

@Injectable()
export class GetWriterGroupMembersUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: GetWriterGroupMembersInput) {
    return await this.writerGroupRepository.getMembers(input);
  }
}
