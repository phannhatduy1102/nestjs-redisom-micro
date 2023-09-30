import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  FastifyRequestWithAuth,
  VerifyWriterGroupOwnershipInput,
  WriterClientProviderOptions,
  WriterGroupMessage,
  validateUUID,
} from '@v2-comic-be/core';
import { isUUID } from 'class-validator';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VerifyWriterGroupOwnershipGuard implements CanActivate {
  constructor(
    @Inject(WriterClientProviderOptions.name)
    private readonly writerMicroservice: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<FastifyRequestWithAuth>();
    const params = request.params as any;
    const requestBody = request.body as any;
    const ids = [...(requestBody?.groupIds || [])];

    if (params.id && isUUID(params?.id, 4)) ids.push(params.id);

    const isUuid = validateUUID([...new Set(ids)]);

    if (!isUuid) {
      return false;
    }

    const isOwner = await firstValueFrom(
      this.writerMicroservice.send<boolean, VerifyWriterGroupOwnershipInput>(
        WriterGroupMessage.VerifyWriterGroupOwnership,
        { groupIds: ids, ownerId: request.user.id }
      )
    );

    return isOwner;
  }
}
