import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AccountTypeEnum,
  CommonWriterResponse,
  GetWriterByEmailInput,
  LoginResponse,
  WriterClientProviderOptions,
  WriterMessage,
} from '@v2-comic-be/core';
import 'dotenv/config';
import { firstValueFrom } from 'rxjs';

export class WriterLoginUsecase {
  constructor(
    @Inject(WriterClientProviderOptions.name)
    private readonly writerMicroservice: ClientProxy,
    private jwtService: JwtService
  ) {}

  async execute(input: GetWriterByEmailInput): Promise<LoginResponse> {
    try {
      const writer = await firstValueFrom<CommonWriterResponse>(
        this.writerMicroservice.send(WriterMessage.GetByEmail, input)
      );

      const payload = {
        id: writer.id,
        email: writer.email,
        name: writer.name,
        avatar: writer.avatar,
        accountType: AccountTypeEnum.Writer,
      };

      const token = this.jwtService.sign(
        {
          ...payload,
        },
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      const refreshToken = this.jwtService.sign(
        {
          ...payload,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        }
      );

      return {
        token,
        refreshToken,
        ...payload,
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
