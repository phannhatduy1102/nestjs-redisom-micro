import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../../constants';

export class CommonResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  status: StatusEnum;
}
