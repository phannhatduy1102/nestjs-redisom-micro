import { ApiProperty } from '@nestjs/swagger';
import { CommonResponse } from '.';

export class CommonUserResponse extends CommonResponse {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  nickname: string | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string | null;

  @ApiProperty()
  isVerifyEmail: boolean;

  @ApiProperty()
  isVerifyPhoneNumber: boolean;

  @ApiProperty()
  isBanned: boolean;

  @ApiProperty()
  bannedReason: string | null;

  @ApiProperty()
  phoneNumber: string | null;
}
