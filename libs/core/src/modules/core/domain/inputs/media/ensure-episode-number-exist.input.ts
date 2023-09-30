import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class EnsureEpisodeNumberExistInput {
  @IsUUID()
  @IsNotEmpty()
  mediaId: string;

  @IsInt()
  @IsNotEmpty()
  episodeNumber: number;
}

export class GatewayEnsureEpisodeNumberExistInput {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  mediaId: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  episodeNumber: number;
}
