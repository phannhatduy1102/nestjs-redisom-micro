import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthClientProviderOptions,
  AuthMessage,
  LoginInput,
} from '@v2-comic-be/core';
import { firstValueFrom } from 'rxjs';

@ApiTags('auth/writer')
@Controller('auth/writer')
export class AuthWriterController {
  constructor(
    @Inject(AuthClientProviderOptions.name)
    private readonly authMicroservice: ClientProxy
  ) {}

  @Post('/login')
  async writerLogin(@Body() data: LoginInput) {
    return await firstValueFrom(
      this.authMicroservice.send(AuthMessage.WriterLogin, data)
    );
  }
}
