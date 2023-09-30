import { Injectable } from '@nestjs/common';
import { VerifyEditMediaPermissionInput } from '@v2-comic-be/core';
import { WriterGroupRepository } from '../repositories';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class VerifyEditMediaPermissionUsecase {
  constructor(private writerGroupRepository: WriterGroupRepository) {}

  async execute(input: VerifyEditMediaPermissionInput) {
    try {
      return this.writerGroupRepository.verifyEditMediaPermission(input);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
