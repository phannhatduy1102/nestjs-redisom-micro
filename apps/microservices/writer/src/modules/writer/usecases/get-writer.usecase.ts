import { Injectable } from '@nestjs/common';
import { IdFieldInput } from '@v2-comic-be/core';
import { WriterRepository } from '../repositories';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GetWriterUsecase {
  constructor(private writerRepository: WriterRepository) {}

  async execute(input: IdFieldInput) {
    try {
      const data = await this.writerRepository.get(input);
      return data;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
