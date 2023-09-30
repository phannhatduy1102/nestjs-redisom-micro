import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  MediaClientProviderOptions,
  MediaMessage,
  VerifyEditMediaPermissionInput,
  VerifyMediaOwnershipInput,
  WriterClientProviderOptions,
  WriterGroupMessage,
} from '@v2-comic-be/core';
import { isUUID } from 'class-validator';
import { firstValueFrom, forkJoin } from 'rxjs';

@Injectable()
export class VerifyEditMediaPermissionGuard implements CanActivate {
  constructor(
    @Inject(WriterClientProviderOptions.name)
    private writerMicroservice: ClientProxy,
    @Inject(MediaClientProviderOptions.name)
    private mediaMicroservice: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const requestBody = request.body as any;
    const params = request.params as any;
    const mediaIds: string[] = requestBody?.mediaIds || [];
    const mediaId: string = requestBody?.mediaId;
    const mediaParamsId = params?.mediaId;

    if (mediaId && isUUID(mediaId, 4)) {
      mediaIds.push(mediaId);
    }

    if (mediaParamsId && isUUID(mediaParamsId, 4)) {
      mediaIds.push(mediaParamsId);
    }

    const hasEditMediaPermission = await firstValueFrom(
      this.writerMicroservice.send<boolean, VerifyEditMediaPermissionInput>(
        WriterGroupMessage.VerifyEditMediaPermission,
        {
          mediaIds: [mediaParamsId],
          writerId: request.user.id,
        }
      )
    );

    if (hasEditMediaPermission) return true;

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
