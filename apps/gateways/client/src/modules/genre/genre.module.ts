import { Module } from '@nestjs/common';
import { GenreController } from './presenters';
import { ClientsModule } from '@nestjs/microservices';
import { MediaClientProviderOptions } from '@v2-comic-be/core';

@Module({
  imports: [ClientsModule.register([MediaClientProviderOptions])],
  controllers: [GenreController],
  providers: [],
  exports: [],
})
export class GenreModule {}
