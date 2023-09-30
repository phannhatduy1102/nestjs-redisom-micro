import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EnsureSlugExistInput, GenreMessage } from '@v2-comic-be/core';
import { EnsureSlugExistUsecase } from '../../usecases';

@Controller()
export class GenreController {
  constructor(
    private readonly ensureSlugExistUsecase: EnsureSlugExistUsecase
  ) {}

  @MessagePattern(GenreMessage.EnsureSlugExist)
  async checkSlugExist(@Payload() input: EnsureSlugExistInput) {
    return await this.ensureSlugExistUsecase.execute(input);
  }
}
