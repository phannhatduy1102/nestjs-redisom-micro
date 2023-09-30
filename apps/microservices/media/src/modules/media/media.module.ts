import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  CommentEntity,
  ConfigEntity,
  CountryEntity,
  EpisodeEntity,
  GenreEntity,
  MediaClientProviderOptions,
  MediaEditPermissionEntity,
  MediaEntity,
  MediaFollowerEntity,
  MediaSchema,
  PermissionEntity,
  PermissionGroupEntity,
  RatingEntity,
  RedisClientModule,
  RoleEntity,
  SeriesEntity,
  UserEntity,
  ViewingHistoryEntity,
  WriterEntity,
  WriterGroupEntity,
  WriterGroupMemberEntity,
  mediaSchema,
} from '@v2-comic-be/core';
import { MediaController } from './presenters';
import { MediaRepository } from './repositories';
import {
  CreateEpisodeUsecase,
  CreateMediaUsecase,
  EnsureEpisodeNumberExistUsecase,
  EnsureSlugExistUsecase,
  GetMediaByIdUsecase,
  GetMediaUsecase,
  UpdateMediaUsecase,
  VerifyMediaOwnershipUsecase,
} from './usecases';

@Module({
  imports: [
    ClientsModule.register([MediaClientProviderOptions]),
    RedisClientModule.forFeature([
      { name: MediaSchema.key, schema: mediaSchema },
    ]),
    TypeOrmModule.forFeature([
      WriterEntity,
      WriterGroupEntity,
      WriterGroupMemberEntity,
      MediaEditPermissionEntity,
      MediaEntity,
      MediaFollowerEntity,
      RatingEntity,
      SeriesEntity,
      CountryEntity,
      EpisodeEntity,
      GenreEntity,
      UserEntity,
      ViewingHistoryEntity,
      RoleEntity,
      PermissionEntity,
      PermissionGroupEntity,
      CommentEntity,
      AdminEntity,
      ConfigEntity,
    ]),
  ],
  controllers: [MediaController],
  providers: [
    MediaRepository,
    CreateMediaUsecase,
    EnsureSlugExistUsecase,
    GetMediaByIdUsecase,
    GetMediaUsecase,
    VerifyMediaOwnershipUsecase,
    UpdateMediaUsecase,
    CreateEpisodeUsecase,
    EnsureEpisodeNumberExistUsecase,
  ],
})
export class MediaModule {}
