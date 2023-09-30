import { Injectable } from '@nestjs/common';
import {
  GetWriterByEmailInput,
  MESSAGE_ERROR_CODE,
  throwRpcError,
  validatePassword,
} from '@v2-comic-be/core';
import { WriterRepository } from '../repositories';

@Injectable()
export class GetWriterByEmailUsecase {
  constructor(private writerRepository: WriterRepository) {}

  async execute(input: GetWriterByEmailInput) {
    const response = await this.writerRepository.getWriterByEmail(input);

    if (!response) {
      throwRpcError(MESSAGE_ERROR_CODE.PASSWORD_OR_EMAIL_INVALID);
    }

    if (response.isBanned) {
      throwRpcError(MESSAGE_ERROR_CODE.ACCOUNT_IS_BANNED);
    }

    const isEqual = await validatePassword(input.password, response.password);

    if (!isEqual) {
      throwRpcError(MESSAGE_ERROR_CODE.PASSWORD_OR_EMAIL_INVALID);
    }

    delete response.password;
    return response;
  }
}
