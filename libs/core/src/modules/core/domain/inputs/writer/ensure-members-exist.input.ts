import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { MAX_MEMBER_ADD_TO_GROUP, MIN_ARRAY_SIZE } from '../../constants';

export class EnsureMembersExist {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @ArrayMaxSize(MAX_MEMBER_ADD_TO_GROUP)
  @IsUUID(4, { each: true })
  memberIds: string[];

  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  groupId: string;
}
