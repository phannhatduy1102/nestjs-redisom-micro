import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EpisodeEntity,
  CreateEpisodeInput,
  CreateMediaInput,
  EnsureEpisodeNumberExistInput,
  MediaEntity,
  MediaSchema,
  QueryTypeEnum,
  StatusEnum,
  UpdateMediaInput,
  VerifyMediaOwnershipInput,
  generateNextHour,
} from '@v2-comic-be/core';
import { Repository as RedisRepository } from 'redis-om';
import { DataSource, Repository } from 'typeorm';
import { GetMediaByIdInput } from '../domain';

@Injectable()
export class MediaRepository {
  constructor(
    @Inject(MediaSchema.repositoryName)
    private readonly redisMediaRepository: RedisRepository,
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
    @InjectRepository(EpisodeEntity)
    private readonly episodeRepository: Repository<EpisodeEntity>,
    private dataSource: DataSource
  ) {}

  async getById({ id }: GetMediaByIdInput) {
    const media = await this.redisMediaRepository.fetch(id);
    return media;
  }

  async get() {
    return this.mediaRepository.find({ take: 100 });
  }

  async create(input: CreateMediaInput): Promise<MediaEntity> {
    return await this.mediaRepository.save(input);
  }

  async update(input: UpdateMediaInput) {
    return await this.mediaRepository.save(input);
  }

  async ensureSlugExist(input: string, queryType = QueryTypeEnum.Redis) {
    if (queryType === QueryTypeEnum.Redis) {
      //
    }
    const media = await this.mediaRepository.findOne({
      select: {
        slug: true,
      },
      where: { slug: input, status: StatusEnum.Active },
    });
    return !!media;
  }

  async verifyMediaOwnership(input: VerifyMediaOwnershipInput) {
    const { mediaId, writerId } = input;
    const result = await this.mediaRepository.findOne({
      select: {
        id: true,
      },
      where: {
        id: mediaId,
        postedBy: {
          id: writerId,
        },
        status: StatusEnum.Active,
      },
    });

    return !!result;
  }

  async createEpisode(input: CreateEpisodeInput) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const media = await this.mediaRepository.findOne({
        select: {
          id: true,
          lastedEpisode: true,
        },
        where: {
          id: input.mediaId,
          status: StatusEnum.Active,
        },
      });

      const mappedMedia = {
        ...media,
        lastedEpisode: media.lastedEpisode + 1,
      };

      const mappedInput = {
        ...input,
        media: { id: media.id },
        mediaId: undefined,
        protectedTime:
          media.isFree || input.isFree
            ? undefined
            : input?.protectedTime || generateNextHour(2),
      };

      const episodePromise = queryRunner.manager.save(
        EpisodeEntity,
        mappedInput
      );
      const mediaPromise = queryRunner.manager.save(MediaEntity, mappedMedia);

      const [episode] = await Promise.all([episodePromise, mediaPromise]);

      await queryRunner.commitTransaction();

      return episode;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async ensureEpisodeNumberExist(input: EnsureEpisodeNumberExistInput) {
    const episode = await this.episodeRepository.findOne({
      select: {
        id: true,
      },
      where: {
        episodeNumber: input.episodeNumber,
        media: {
          id: input.mediaId,
        },
        status: StatusEnum.Active,
      },
    });

    return !!episode;
  }
}
