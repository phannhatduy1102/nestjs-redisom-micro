import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested
} from 'class-validator';
import {
  MAX_NAME_LENGTH,
  MAX_YEAR,
  MIN_PRICE,
  MIN_YEAR,
} from '../../constants';
import {
  CommonUpdateInput,
  GatewayCommonUpdateInput,
  IdFieldInput,
} from '../common';

export class UpdateMediaInput extends CommonUpdateInput {
  @IsString()
  @IsOptional()
  otherName?: string;

  @IsInt()
  @IsOptional()
  @Max(MAX_YEAR)
  @Min(MIN_YEAR)
  yop?: number;

  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(MIN_PRICE)
  price?: number;

  @IsOptional()
  isFree?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(MIN_PRICE)
  pricePerEpisode?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => IdFieldInput)
  series?: IdFieldInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => IdFieldInput)
  madeBy?: IdFieldInput;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdFieldInput)
  genre?: IdFieldInput[];
}

export class GatewayUpdateMediaInput extends GatewayCommonUpdateInput {
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(MAX_NAME_LENGTH)
  otherName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  author: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Max(MAX_YEAR)
  @Min(MIN_YEAR)
  yop: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(MIN_PRICE)
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  isFree?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(MIN_PRICE)
  pricePerEpisode?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4)
  seriesId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4)
  madeById?: string;

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  genreIds: string[];
}

export class UpdateMediaParams {
  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  mediaId: string;
}
