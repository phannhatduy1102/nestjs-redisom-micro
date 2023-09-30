import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { MIN_ARRAY_SIZE } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteWriterGroupMembersInput {
  @IsUUID(4)
  @IsNotEmpty()
  groupId: string;

  @IsUUID(4)
  @IsNotEmpty()
  ownerId: string;

  @IsArray()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  memberIds: string[];
}

export class GatewayDeleteWriterGroupMembersInput {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  ids: string[];
}
