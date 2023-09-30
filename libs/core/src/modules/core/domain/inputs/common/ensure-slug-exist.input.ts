import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  MAX_ARRAY_SIZE,
  MAX_SLUG_LENGTH,
  MIN_ARRAY_SIZE,
} from '../../constants';

export class EnsureSlugExistInput {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @ArrayMaxSize(MAX_ARRAY_SIZE)
  @IsUUID(4, { each: true })
  ids: string[];
}

export class MediaEnsureSlugExistInput {
  @ApiProperty()
  @IsArray()
  @IsString()
  @MaxLength(MAX_SLUG_LENGTH)
  slug: string;
}
