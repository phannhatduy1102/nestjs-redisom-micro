import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { FastifyReply } from 'fastify';
import { MESSAGE_ERROR_CODE } from '../domain/constants';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  override catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    const isProduction = process.env['NODE_ENV'] === 'production';

    const error = {
      statusCode: exception?.status || 500,
      success: exception?.status > 200 && exception?.status < 300,
      message: isProduction ? undefined : exception?.response?.message,
      code:
        exception?.response?.code ||
        exception?.status ||
        MESSAGE_ERROR_CODE.CLIENT_ERROR,
    };
    response.status(error.statusCode).send(error);
  }
}
