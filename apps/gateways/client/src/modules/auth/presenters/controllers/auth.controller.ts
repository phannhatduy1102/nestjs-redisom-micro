import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AuthClientProviderOptions } from '@v2-comic-be/core';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthClientProviderOptions.name)
    private readonly authMicroservice: ClientProxy
  ) {}
}
