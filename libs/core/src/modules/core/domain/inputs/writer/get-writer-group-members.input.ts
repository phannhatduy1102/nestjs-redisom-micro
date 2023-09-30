import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetWriterGroupMembersInput {
  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  groupId: string;

  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  ownerId: string;
}

export class GatewayGetWriterGroupMembersInput {}
