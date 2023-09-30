import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  EpisodeEntity,
  CommentEntity,
  CountryEntity,
  GenreEntity,
  MediaEntity,
  MediaFollowerEntity,
  MediaEditPermissionEntity,
  PermissionEntity,
  PermissionGroupEntity,
  RatingEntity,
  RoleEntity,
  SeriesEntity,
  UserEntity,
  ViewingHistoryEntity,
  WriterEntity,
  WriterGroupEntity,
  WriterGroupMemberEntity,
  ConfigEntity,
  RedisClientModule,
  WriterSchema,
  writerSchema,
} from '@v2-comic-be/core';
import { WriterController, WriterGroupController } from './presenters';
import { WriterRepository, WriterGroupRepository } from './repositories';
import {
  AddMemberToWriterGroupUsecase,
  EnsureMembersExistUsecase,
  CreateWriterGroupUsecase,
  GetWriterByEmailUsecase,
  GetWriterUsecase,
  VerifyWriterGroupOwnershipUsecase,
  GetWriterGroupMembersUsecase,
  AddEditMediaPermissionUsecase,
  DeleteEditMediaPermissionUsecase,
  DeleteWriterGroupMembersUsecase,
  DeleteWriterGroupUsecase,
  UpdateWriterGroupUsecase,
  VerifyEditMediaPermissionUsecase,
  EnsureMediaInGroupExistUsecase,
  CreateWriterUsecase,
} from './usecases';

@Module({
  imports: [
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
    RedisClientModule.forFeature([
      { name: WriterSchema.key, schema: writerSchema },
    ]),
  ],
  controllers: [WriterController, WriterGroupController],
  providers: [
    WriterRepository,
    WriterGroupRepository,
    GetWriterByEmailUsecase,
    GetWriterUsecase,
    CreateWriterGroupUsecase,
    AddMemberToWriterGroupUsecase,
    EnsureMembersExistUsecase,
    VerifyWriterGroupOwnershipUsecase,
    GetWriterGroupMembersUsecase,
    AddEditMediaPermissionUsecase,
    DeleteEditMediaPermissionUsecase,
    DeleteWriterGroupMembersUsecase,
    DeleteWriterGroupUsecase,
    UpdateWriterGroupUsecase,
    VerifyEditMediaPermissionUsecase,
    EnsureMediaInGroupExistUsecase,
    CreateWriterUsecase,
  ],
})
export class WriterModule {}
