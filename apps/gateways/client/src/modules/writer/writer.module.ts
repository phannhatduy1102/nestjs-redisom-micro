import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
  MediaClientProviderOptions,
  WriterClientProviderOptions,
} from '@v2-comic-be/core';
import { JwtAuthGuard, VerifyWriterGroupOwnershipGuard } from '../../guards';
import { JwtStrategy } from '../../strategies';
import {
  WriterController,
  WriterGroupController,
  WriterMediaController,
} from './presenters';

@Module({
  imports: [
    ClientsModule.register([
      WriterClientProviderOptions,
      MediaClientProviderOptions,
    ]),
  ],
  controllers: [WriterController, WriterMediaController, WriterGroupController],
  providers: [JwtAuthGuard, JwtStrategy, VerifyWriterGroupOwnershipGuard],
  exports: [],
})
export class WriterModule {}
