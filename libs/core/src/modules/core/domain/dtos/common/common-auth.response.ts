import { ApiProperty } from '@nestjs/swagger';
import { AccountTypeEnum } from '../../constants';

export class LoginResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  avatar: string | null;

  @ApiProperty()
  accountType: AccountTypeEnum;
}
