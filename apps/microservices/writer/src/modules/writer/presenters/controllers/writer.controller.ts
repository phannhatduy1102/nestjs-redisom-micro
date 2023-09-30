import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateWriterInput,
  GetWriterByEmailInput,
  IdFieldInput,
  WriterMessage,
} from '@v2-comic-be/core';
import {
  CreateWriterUsecase,
  GetWriterByEmailUsecase,
  GetWriterUsecase,
} from '../../usecases';

@Controller()
export class WriterController {
  constructor(
    private getWriterByEmailUseCase: GetWriterByEmailUsecase,
    private getWriterUseCase: GetWriterUsecase,
    private createWriterUseCase: CreateWriterUsecase
  ) {}

  @MessagePattern(WriterMessage.GetByEmail)
  async getByEmail(@Payload() payload: GetWriterByEmailInput) {
    return this.getWriterByEmailUseCase.execute(payload);
  }

  @MessagePattern(WriterMessage.Get)
  async get(@Payload() payload: IdFieldInput) {
    return this.getWriterUseCase.execute(payload);
  }

  @MessagePattern(WriterMessage.Create)
  async create(@Payload() payload: CreateWriterInput) {
    return await this.createWriterUseCase.execute(payload);
  }
}
