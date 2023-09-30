import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MAX_STRING_LENGTH } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWriterInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_STRING_LENGTH)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_STRING_LENGTH)
  password: string;
}

export class GatewayCreateWriterInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_STRING_LENGTH)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_STRING_LENGTH)
  password: string;
}
