import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { MIN_NUMBER } from '../../constants';

export class EpisodeImageInput {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsInt()
  @IsNotEmpty()
  @Min(MIN_NUMBER)
  sort: number;

  @IsString()
  @IsOptional()
  alt?: string;
}

export class EpisodeVideoInput {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsInt()
  @IsNotEmpty()
  @Min(MIN_NUMBER)
  sort: number;

  @IsString()
  @IsOptional()
  server?: string;
}
