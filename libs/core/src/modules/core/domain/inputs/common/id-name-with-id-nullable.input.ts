import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export abstract class IdNameWithNullIdInput {
  @ApiPropertyOptional()
  @IsUUID(4)
  id: string | null;

  @ApiProperty()
  @IsString()
  name: string;
}
