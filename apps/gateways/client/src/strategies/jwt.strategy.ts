import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import {
  AccountTypeEnum,
  CommonWriterResponse,
  JwtValidatePayload,
  WriterClientProviderOptions,
  WriterMessage,
} from '@v2-comic-be/core';
import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(WriterClientProviderOptions.name)
    private readonly writerMicroservice: ClientProxy
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  async validate(payload: JwtValidatePayload) {
    try {
      const { id, accountType } = payload;

      if (accountType === AccountTypeEnum.Writer) {
        const writer = await firstValueFrom<CommonWriterResponse>(
          this.writerMicroservice.send(WriterMessage.Get, { id })
        );
        if (!writer) {
          return false;
        }
        return payload;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
