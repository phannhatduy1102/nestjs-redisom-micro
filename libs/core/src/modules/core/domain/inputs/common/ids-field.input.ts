import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { MAX_ARRAY_ID_SIZE } from '../../constants';

export class IdsFieldInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMaxSize(MAX_ARRAY_ID_SIZE)
  ids: string[];
}
