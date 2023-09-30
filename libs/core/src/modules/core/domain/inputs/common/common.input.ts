import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  MAX_SLUG_LENGTH,
  StatusEnum,
} from '../../constants';

export class CommonInput {
  @ApiProperty()
  @IsString()
  @MaxLength(MAX_SLUG_LENGTH)
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_NAME_LENGTH)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(MAX_DESCRIPTION_LENGTH)
  description?: string;

  @ApiPropertyOptional({
    enum: StatusEnum,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum.Active;
}

export class CommonUpdateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(MAX_SLUG_LENGTH)
  slug: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(MAX_NAME_LENGTH)
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(MAX_DESCRIPTION_LENGTH)
  description: string | null;

  @ApiPropertyOptional({
    enum: StatusEnum,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum.Active;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverImage: string | null;
}

export class GatewayCommonUpdateInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(MAX_SLUG_LENGTH)
  slug: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(MAX_NAME_LENGTH)
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MaxLength(MAX_DESCRIPTION_LENGTH)
  description: string | null;

  @ApiPropertyOptional({
    enum: StatusEnum,
  })
  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum.Active;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverImage: string | null;
}

export class CommonPagination {
  @IsOptional()
  @IsNumber()
  page = DEFAULT_PAGE;

  @IsOptional()
  @IsNumber()
  limit = DEFAULT_PAGE_SIZE;
}
