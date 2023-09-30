import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { MIN_ARRAY_SIZE } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteEditMediaPermissionInput {
  @IsArray()
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  ids: string[];

  @IsUUID(4)
  @IsNotEmpty()
  ownerId: string;
}

export class GatewayDeleteEditMediaPermissionInput {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  @ArrayMinSize(MIN_ARRAY_SIZE)
  ids: string[];
}
