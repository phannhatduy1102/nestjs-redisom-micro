import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { MediaClientProviderOptions, MediaMessage } from '@v2-comic-be/core';
import { firstValueFrom } from 'rxjs';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(
    @Inject(MediaClientProviderOptions.name)
    private readonly mediaMicroservice: ClientProxy
  ) {}

  //TODO - Not implemented yet
  @Get(':id')
  async get(@Query() query: unknown) {
    return await firstValueFrom(
      this.mediaMicroservice.send(MediaMessage.Get, query)
    );
  }

  // TODO - Not implemented yet
  @Get()
  async getList(@Query() query: unknown) {
    return await firstValueFrom(
      this.mediaMicroservice.send(MediaMessage.GetList, query)
    );
  }

  // @Post()
  // async create(
  //   @Body() body: GatewayCreateMediaInput,
  //   @UserDecorator() user: FastifyRequestWithAuth['user']
  // ) {
  //   const input: CreateMediaInput = {
  //     ...body,
  //     series: { id: body.seriesId },
  //     madeBy: { id: body.madeById },
  //     genre: createIdMapObjects(body.genreIds),
  //     postedBy: { id: user.id },
  //   };
  //   return await firstValueFrom(
  //     this.mediaMicroservice.send<unknown, CreateMediaInput>(
  //       MediaMessage.Create,
  //       input
  //     )
  //   );
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('/verify-ownership')
  // async verifyOwnership(
  //   @Body() body: GatewayVerifyMediaOwnershipInput,
  //   @UserDecorator() user: FastifyRequestWithAuth['user']
  // ) {
  //   const input: VerifyMediaOwnershipInput = {
  //     mediaId: body.id,
  //     writerId: user.id,
  //   };
  //   return await firstValueFrom(
  //     this.mediaMicroservice.send<unknown, VerifyMediaOwnershipInput>(
  //       MediaMessage.VerifyOwnership,
  //       input
  //     )
  //   );
  // }
}
