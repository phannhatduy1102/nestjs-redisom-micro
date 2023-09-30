import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateEpisodeInput,
  CreateMediaInput,
  FastifyRequestWithAuth,
  GatewayCreateEpisodeInput,
  GatewayCreateMediaInput,
  GatewayUpdateMediaInput,
  MediaEntity,
  MediaClientProviderOptions,
  MediaMessage,
  UpdateMediaInput,
  UpdateMediaParams,
  UserDecorator,
  createIdMapObjects,
  transformIdToObjectId,
} from '@v2-comic-be/core';
import { firstValueFrom } from 'rxjs';
import {
  JwtAuthGuard,
  VerifyEditMediaPermissionGuard,
} from '../../../../guards';

@ApiTags('writer/media')
@Controller('writer/media')
@UseGuards(JwtAuthGuard)
export class WriterMediaController {
  constructor(
    @Inject(MediaClientProviderOptions.name)
    private readonly mediaMicroservices: ClientProxy
  ) {}

  @Get()
  async get() {
    return 'writer';
  }

  @Post('/create')
  create(
    @Query('seed') seed: string,
    @Body() data: GatewayCreateMediaInput,
    @UserDecorator() user: FastifyRequestWithAuth['user']
  ) {
    const input: CreateMediaInput = {
      ...data,
      series: { id: data.seriesId },
      madeBy: { id: data.madeById },
      genre: createIdMapObjects(data.genreIds),
      postedBy: { id: user.id },
    };

    // if (Number(seed) > 0) {
    //   const request = Array.from({ length: Number(seed) }).map(() => {
    //     const input: CreateMediaInput = {
    //       author: generateRandomString(100),
    //       yop: 2022,
    //       price: 150000,
    //       coverImage: generateRandomString(100),
    //       name: generateRandomString(100),
    //       otherName: generateRandomString(100),
    //       slug: generateRandomString(100),
    //       genre: [{ id: '57307ad9-548e-42ee-babe-44acecc6e3ae' }],
    //       postedBy: { id: user.id },
    //     };
    //     return this.mediaMicroservices.send<Media, CreateMediaInput>(
    //       MediaMessage.Create,
    //       input
    //     );
    //   });
    //   return firstValueFrom(forkJoin(request));
    // }

    return firstValueFrom(
      this.mediaMicroservices.send<MediaEntity, CreateMediaInput>(
        MediaMessage.Create,
        input
      )
    );
  }

  @UseGuards(VerifyEditMediaPermissionGuard)
  @Put(':mediaId')
  update(
    @Param() params: UpdateMediaParams,
    @Body() data: GatewayUpdateMediaInput
  ) {
    const input = {
      ...data,
      id: params.mediaId,
      series: transformIdToObjectId(data.seriesId),
      madeBy: transformIdToObjectId(data.madeById),
      genre: data.genreIds ? createIdMapObjects(data.genreIds) : undefined,
      seriesId: undefined,
      madeById: undefined,
      genreIds: undefined,
    };

    return firstValueFrom(
      this.mediaMicroservices.send<unknown, UpdateMediaInput>(
        MediaMessage.Update,
        input
      )
    );
  }

  @UseGuards(VerifyEditMediaPermissionGuard)
  @Post(':mediaId/episode')
  createEpisode(
    @Param() params: UpdateMediaParams,
    @UserDecorator() user: FastifyRequestWithAuth['user'],
    @Body() data: GatewayCreateEpisodeInput
  ) {
    const input: CreateEpisodeInput = {
      ...data,
      mediaId: params.mediaId,
      writerId: user.id,
    };

    return firstValueFrom(
      this.mediaMicroservices.send<unknown, CreateEpisodeInput>(
        MediaMessage.CreateEpisode,
        input
      )
    );
  }
}
