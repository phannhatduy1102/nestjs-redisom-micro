import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { MIN_ARRAY_SIZE } from '../../constants';

export class VerifyWriterGroupOwnershipInput {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  groupIds: string[];

  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  ownerId: string;
}
