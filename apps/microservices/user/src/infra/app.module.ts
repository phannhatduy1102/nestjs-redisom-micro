import { Module } from '@nestjs/common';
import { UserModule } from '../modules/user/user.module';
import { CoreModule } from '@v2-comic-be/core';

@Module({
  imports: [CoreModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
