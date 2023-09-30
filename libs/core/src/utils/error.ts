import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MAPPED_ERROR_CODE } from '../modules';
import { RpcException } from '@nestjs/microservices';

export const throwRpcError = (error: number[] | number) => {
  const exceptionMap: Record<number, new (options: { code: number }) => Error> =
    {
      400: BadRequestException,
      401: UnauthorizedException,
      404: NotFoundException,
    };

  const errors = Array.isArray(error) ? error : [error];

  for (const _error of errors) {
    const httpCode = findHttpCodeFromMessageErrorCode(_error);

    if (httpCode) {
      const ExceptionClass = exceptionMap[httpCode];
      if (ExceptionClass) {
        throw new RpcException(new ExceptionClass({ code: _error }));
      }
    }
  }
};

export const findHttpCodeFromMessageErrorCode = (
  messageCode: number
): number | undefined => {
  for (const key of Object.keys(MAPPED_ERROR_CODE)) {
    const httpCode = Number(key);
    const messageCodes =
      MAPPED_ERROR_CODE[Number(key) as keyof typeof MAPPED_ERROR_CODE];
    if (messageCodes.includes(messageCode)) {
      return httpCode;
    }
  }
  return undefined;
};
