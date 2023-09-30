import { Module } from '@nestjs/common';
import { ConfigRepository } from './repositories';
import 'dotenv/config';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigRepository],
})
export class CommonModule {}
