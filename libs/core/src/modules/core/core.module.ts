import { Module } from '@nestjs/common';
import 'dotenv/config';
import { RedisClientModule } from '../redis-client';

@Module({
  imports: [RedisClientModule.forRootAsync()],
  providers: [],
  exports: [],
})
export class CoreModule {}
