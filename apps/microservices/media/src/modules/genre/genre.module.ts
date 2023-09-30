import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  CommentEntity,
  CountryEntity,
  EpisodeEntity,
  GenreEntity,
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
import { GenreController } from './presenters';
import { GenreRepository } from './repositories';
import { EnsureSlugExistUsecase } from './usecases';

@Module({
  imports: [
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
    ]),
  ],
  controllers: [GenreController],
  providers: [GenreRepository, EnsureSlugExistUsecase],
  exports: [],
})
export class GenreModule {}
