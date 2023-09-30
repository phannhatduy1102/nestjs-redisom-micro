import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  MAX_NAME_LENGTH,
  MAX_YEAR,
  MIN_ARRAY_SIZE,
  MIN_NUMBER,
  MIN_PRICE,
  MIN_YEAR,
  MediaTypeEnum,
} from '../../constants';
import { CommonInput, IdFieldInput } from '../common';

export class CreateMediaInput extends CommonInput {
  @IsOptional()
  @MaxLength(MAX_NAME_LENGTH)
  otherName?: string;

  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @IsNotEmpty()
  @IsInt()
  @Max(MAX_YEAR)
  @Min(MIN_YEAR)
  yop: number;

  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @IsInt()
  @Min(MIN_NUMBER)
  lastedEpisode?: number = 0;

  @IsNumber()
  @Min(MIN_PRICE)
  @IsOptional()
  price?: number = MIN_PRICE;

  @IsOptional()
  isFree?: boolean = true;

  @IsEnum(MediaTypeEnum)
  @IsNotEmpty()
  type: MediaTypeEnum;

  @IsNumber()
  @Min(MIN_PRICE)
  @IsOptional()
  pricePerEpisode?: number = MIN_PRICE;

  @IsOptional()
  @ValidateNested()
  @Type(() => IdFieldInput)
  series?: IdFieldInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => IdFieldInput)
  madeBy?: IdFieldInput;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @Type(() => IdFieldInput)
  genre: IdFieldInput[];

  @ValidateNested()
  @Type(() => IdFieldInput)
  @IsUUID(4)
  postedBy: IdFieldInput;
}

export class GatewayCreateMediaInput extends CommonInput {
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(MAX_NAME_LENGTH)
  otherName: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(MAX_YEAR)
  @Min(MIN_YEAR)
  yop: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  releaseDate: Date | null;

  @ApiPropertyOptional()
  @IsInt()
  @Min(MIN_NUMBER)
  lastedEpisode = 0;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(MIN_PRICE)
  price: number = MIN_PRICE;

  @ApiPropertyOptional()
  @IsOptional()
  isFree = true;

  @ApiProperty()
  @IsEnum(MediaTypeEnum)
  @IsNotEmpty()
  type: MediaTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(MIN_PRICE)
  pricePerEpisode: number = MIN_PRICE;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4)
  seriesId: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4)
  madeById: string | null;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(MIN_ARRAY_SIZE)
  genreIds: string[];
}
