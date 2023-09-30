import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import {
  MediaClientProviderOptions,
  WriterClientProviderOptions,
} from '@v2-comic-be/core';
import { MediaController } from './presenters';

@Module({
  imports: [
    ClientsModule.register([
      MediaClientProviderOptions,
      WriterClientProviderOptions,
    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [MediaController],
  providers: [],
  exports: [],
})
export class MediaModule {}
