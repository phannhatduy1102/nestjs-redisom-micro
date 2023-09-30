import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class VerifyMediaOwnershipInput {
  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  mediaId: string;

  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  writerId: string;
}

export class GatewayVerifyMediaOwnershipInput {
  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
