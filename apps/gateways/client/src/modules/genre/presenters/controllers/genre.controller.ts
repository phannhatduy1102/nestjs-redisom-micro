import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  EnsureSlugExistInput,
  GenreMessage,
  MediaClientProviderOptions,
} from '@v2-comic-be/core';
import { firstValueFrom } from 'rxjs';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(
    @Inject(MediaClientProviderOptions.name)
    private readonly mediaMicroservice: ClientProxy
  ) {}

  @Post('/ensure-slug-exist')
  async ensureSlugExist(@Body() data: EnsureSlugExistInput) {
    return await firstValueFrom(
      this.mediaMicroservice.send(GenreMessage.EnsureSlugExist, data)
    );
  }
}
