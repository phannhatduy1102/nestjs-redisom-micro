import { ArgumentsHost, Catch } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FastifyReply } from 'fastify';

@Catch(RpcException)
export class RpcExceptionsFilter implements RpcExceptionsFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    const error = {
      statusCode: exception.status || 500,
      code: exception.response?.code,
      success: exception.status > 200 && exception.status < 300,
    };

    response.status(error.statusCode).send(error);
  }
}
