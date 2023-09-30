import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { MIN_ARRAY_SIZE } from '../../constants';
import { IdFieldInput } from '../common';

export class AddEditMediaPermissionInput {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @Type(() => IdFieldInput)
  media: IdFieldInput[];

  @ValidateNested()
  @Type(() => IdFieldInput)
  group: IdFieldInput;

  @ValidateNested()
  @Type(() => IdFieldInput)
  owner: IdFieldInput;
}

export class GatewayAddEditMediaPermissionInput {
  @ApiProperty()
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(MIN_ARRAY_SIZE)
  mediaIds: string[];
}
