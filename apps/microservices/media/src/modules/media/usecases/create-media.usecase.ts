import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateMediaInput,
  EnsureSlugExist,
  EnsureSlugExistInput,
  GenreMessage,
  MESSAGE_ERROR_CODE,
  MediaClientProviderOptions,
  convertGenreSlugToInput,
  throwRpcError,
} from '@v2-comic-be/core';
import { firstValueFrom } from 'rxjs';
import slug from 'slug';
import { MediaRepository } from '../repositories';
import { EnsureSlugExistUsecase } from './ensure-slug-exist.usecase';

@Injectable()
export class CreateMediaUsecase {
  constructor(
    @Inject(MediaClientProviderOptions.name)
    private genreMicroservice: ClientProxy,
    private mediaRepository: MediaRepository,
    private ensureSlugExistUsecase: EnsureSlugExistUsecase
  ) {}

  async execute(input: CreateMediaInput) {
    const data = { ...input };
    if (!data.slug) {
      data.slug = slug(data.name);
    }
    const isExistSlugPromise = this.ensureSlugExistUsecase.execute({
      slug: data.slug,
    });

    const isExistAllGenrePromise = firstValueFrom(
      this.genreMicroservice.send<EnsureSlugExist, EnsureSlugExistInput>(
        GenreMessage.EnsureSlugExist,
        convertGenreSlugToInput(data.genre)
      )
    );

    const [isExistSlug, isExistAllGenre] = await Promise.all([
      isExistSlugPromise,
      isExistAllGenrePromise,
    ]);

    if (isExistSlug) {
      throwRpcError(MESSAGE_ERROR_CODE.MEDIA_SLUG_IS_EXIST);
    }

    if (!isExistAllGenre.isExist) {
      throwRpcError(MESSAGE_ERROR_CODE.NOT_FOUND_GENRE);
    }

    try {
      await this.mediaRepository.create(data);
      return true;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
