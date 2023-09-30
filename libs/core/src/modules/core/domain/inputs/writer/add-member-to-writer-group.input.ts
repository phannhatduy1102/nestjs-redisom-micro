import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { MAX_MEMBER_ADD_TO_GROUP, MIN_ARRAY_SIZE } from '../../constants';
import { IdFieldInput } from '../common';

export class AddMemberToWriterGroupInput {
  @ValidateNested()
  @Type(() => IdFieldInput)
  owner: IdFieldInput;

  @ValidateNested()
  @Type(() => IdFieldInput)
  group: IdFieldInput;

  @IsArray()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @ArrayMaxSize(MAX_MEMBER_ADD_TO_GROUP)
  @ValidateNested({ each: true })
  @Type(() => IdFieldInput)
  writers: IdFieldInput[];
}

export class GatewayAddMemberToWriterGroupInput {
  @ApiProperty()
  @IsArray()
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @ArrayMaxSize(MAX_MEMBER_ADD_TO_GROUP)
  ids: string[];
}
