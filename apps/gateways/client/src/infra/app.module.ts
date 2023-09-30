import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CoreModule, WriterClientProviderOptions } from '@v2-comic-be/core';
import { AuthModule, MediaModule, WriterModule } from '../modules';
import { GenreModule } from '../modules/genre';

@Module({
  imports: [
    ClientsModule.register([WriterClientProviderOptions]),
    CoreModule,
    AuthModule,
    MediaModule,
    WriterModule,
    GenreModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
