import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CommonInput, IdFieldInput } from '../common';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWriterGroupInput extends CommonInput {
  @ValidateNested()
  owner: IdFieldInput;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coverImage: string | null;
}
