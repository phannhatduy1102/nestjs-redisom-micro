import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthClientProviderOptions } from '@v2-comic-be/core';
import { AuthController, AuthWriterController } from './presenters';

@Module({
  imports: [ClientsModule.register([AuthClientProviderOptions])],
  controllers: [AuthController, AuthWriterController],
  providers: [],
  exports: [],
})
export class AuthModule {}
