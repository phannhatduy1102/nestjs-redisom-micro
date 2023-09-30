import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
  AuthClientProviderOptions,
  WriterClientProviderOptions,
} from '@v2-comic-be/core';
import 'dotenv/config';
import { AuthController } from './presenters';
import { WriterLoginUsecase } from './usecases';
import { JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      WriterClientProviderOptions,
      AuthClientProviderOptions,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [WriterLoginUsecase, JwtStrategy],
})
export class AuthModule {}
