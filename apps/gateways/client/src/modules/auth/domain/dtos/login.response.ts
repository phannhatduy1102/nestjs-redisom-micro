import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@v2-comic-be/core';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  user: UserEntity;
}
