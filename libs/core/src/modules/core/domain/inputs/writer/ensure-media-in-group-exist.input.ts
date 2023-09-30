import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { MAX_MEMBER_ADD_TO_GROUP, MIN_ARRAY_SIZE } from '../../constants';

export class EnsureMediaInGroupExistInput {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @ArrayMaxSize(MAX_MEMBER_ADD_TO_GROUP)
  @IsUUID(4, { each: true })
  ids: string[];
}

export class GatewayEnsureMediaInGroupExistInput {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @ArrayMaxSize(MAX_MEMBER_ADD_TO_GROUP)
  @IsUUID(4, { each: true })
  ids: string[];
}
