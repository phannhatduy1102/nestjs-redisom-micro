import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  FastifyRequestWithAuth,
  MediaClientProviderOptions,
  MediaMessage,
  VerifyMediaOwnershipInput,
} from '@v2-comic-be/core';
import { isUUID } from 'class-validator';
import { firstValueFrom, forkJoin } from 'rxjs';

@Injectable()
export class VerifyMediaOwnershipGuard implements CanActivate {
  constructor(
    @Inject(MediaClientProviderOptions.name)
    private mediaMicroservice: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<FastifyRequestWithAuth>();
    const requestBody = request.body as any;
    const mediaIds: string[] = requestBody?.mediaIds || [];
    const mediaId: string = requestBody?.mediaId;

    if (mediaId && isUUID(mediaId, 4)) {
      mediaIds.push(mediaId);
    }

    const filteredMediaIds = [
      ...new Set(mediaIds.filter((id) => isUUID(id, 4))),
    ];

    if (filteredMediaIds.length === 0) return false;

    const isOwnerPromise = filteredMediaIds.map((id) =>
      this.mediaMicroservice.send<boolean, VerifyMediaOwnershipInput>(
        MediaMessage.VerifyOwnership,
        { mediaId: id, writerId: request.user.id }
      )
    );

    const isOwnerResults = await firstValueFrom(forkJoin(isOwnerPromise));

    return isOwnerResults.every((item) => item);
  }
}
