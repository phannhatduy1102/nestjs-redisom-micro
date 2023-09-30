import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  MIN_ARRAY_SIZE,
  MIN_EPISODE_NUMBER,
  MIN_PRICE,
  MediaTypeEnum,
} from '../../constants';
import { CommonInput } from '../common';
import { EpisodeImageInput, EpisodeVideoInput } from './episode.input';
import { convertDateToUtc } from '../../../../../utils';

export class CreateEpisodeInput extends CommonInput {
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @IsInt()
  @Min(MIN_EPISODE_NUMBER)
  @IsNotEmpty()
  episodeNumber: number;

  @IsEnum(MediaTypeEnum)
  @IsNotEmpty()
  episodeType: MediaTypeEnum;

  @ValidateIf((o) => o.episodeType === MediaTypeEnum.Text)
  @IsNotEmpty()
  @IsString()
  content: string;

  @ValidateIf((o) => o.episodeType === MediaTypeEnum.Image)
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EpisodeImageInput)
  images: EpisodeImageInput[];

  @ValidateIf((o) => o.episodeType === MediaTypeEnum.Video)
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EpisodeVideoInput)
  videos: EpisodeVideoInput[];

  @IsNumber()
  @IsNotEmpty()
  @Min(MIN_PRICE)
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  isFree = true;

  @ValidateIf((o) => o.isFree === false)
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => convertDateToUtc(value))
  protectedTime?: Date;

  @IsNotEmpty()
  @IsUUID()
  mediaId: string;

  @IsNotEmpty()
  @IsUUID()
  writerId: string;
}

export class GatewayCreateEpisodeInput extends CommonInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @ApiProperty()
  @IsInt()
  @Min(MIN_EPISODE_NUMBER)
  @IsNotEmpty()
  episodeNumber: number;

  @ApiProperty({ type: String, enum: MediaTypeEnum })
  @IsEnum(MediaTypeEnum)
  @IsNotEmpty()
  episodeType: MediaTypeEnum;

  @ApiProperty()
  @ValidateIf((o) => o.episodeType === MediaTypeEnum.Text)
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ type: [EpisodeImageInput] })
  @ValidateIf((o) => o.episodeType === MediaTypeEnum.Image)
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @ValidateNested({ each: true })
  @Type(() => EpisodeImageInput)
  images: EpisodeImageInput[];

  @ApiProperty({ type: [EpisodeVideoInput] })
  @ValidateIf((o) => o.episodeType === MediaTypeEnum.Video)
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @ValidateNested({ each: true })
  @Type(() => EpisodeVideoInput)
  videos: EpisodeVideoInput[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(MIN_PRICE)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isFree = true;

  @ApiProperty()
  @ValidateIf((o) => o.isFree === false)
  @IsDate()
  @IsNotEmpty()
  protectedTime: Date;
}
