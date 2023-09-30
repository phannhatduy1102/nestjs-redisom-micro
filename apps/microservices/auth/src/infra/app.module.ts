import { Module } from '@nestjs/common';
import { CoreModule } from '@v2-comic-be/core';
import { AuthModule } from '../modules';

@Module({
  imports: [CoreModule, AuthModule],
  providers: [],
})
export class AppModule {}
