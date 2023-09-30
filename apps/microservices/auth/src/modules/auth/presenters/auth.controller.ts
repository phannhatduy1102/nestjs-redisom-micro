import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthMessage, LoginInput } from '@v2-comic-be/core';
import { WriterLoginUsecase } from '../usecases';

@Controller()
export class AuthController {
  constructor(private readonly writerLoginUsecase: WriterLoginUsecase) {}

  @MessagePattern(AuthMessage.WriterLogin)
  async writerLogin(@Payload() payload: LoginInput) {
    return await this.writerLoginUsecase.execute(payload);
  }
}
