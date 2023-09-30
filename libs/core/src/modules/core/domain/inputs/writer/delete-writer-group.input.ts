import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { MIN_ARRAY_SIZE } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteWriterGroupInput {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @IsUUID(4, { each: true })
  writerGroupIds: string[];

  @IsUUID(4)
  @IsNotEmpty()
  ownerId: string;
}

export class GatewayDeleteWriterGroupInput {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  @IsUUID(4, { each: true })
  groupIds: string[];
}
