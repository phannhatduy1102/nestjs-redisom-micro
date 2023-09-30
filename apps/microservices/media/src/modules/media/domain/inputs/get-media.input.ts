import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetMediaByIdInput {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  id: string;
}
