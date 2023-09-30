import { FastifyRequest } from 'fastify';
import { LoginResponse } from '../dtos';

export type JwtValidatePayload = LoginResponse & {
  iat: number;
  exp: number;
};

export type JwtTokenPayload = JwtValidatePayload;

export type FastifyRequestWithAuth = FastifyRequest & {
  user: JwtTokenPayload;
};
