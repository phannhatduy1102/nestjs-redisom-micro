import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddEditMediaPermissionInput,
  AddMemberToWriterGroupInput,
  COMMON_WRITER_GROUP_MEMBER_SELECT_FIELD,
  CreateWriterGroupInput,
  DeleteEditMediaPermissionInput,
  DeleteWriterGroupInput,
  DeleteWriterGroupMembersInput,
  EnsureMediaInGroupExistInput,
  EnsureMembersExist,
  GetWriterGroupMembersInput,
  MediaEditPermissionEntity,
  StatusEnum,
  UpdateWriterGroupInput,
  VerifyEditMediaPermissionInput,
  VerifyWriterGroupOwnershipInput,
  WriterGroupEntity,
  WriterGroupMemberEntity,
  destructIds,
} from '@v2-comic-be/core';
import { In, Repository } from 'typeorm';

@Injectable()
export class WriterGroupRepository {
  constructor(
    @InjectRepository(WriterGroupEntity)
    private readonly writerGroupRepository: Repository<WriterGroupEntity>,
    @InjectRepository(WriterGroupMemberEntity)
    private readonly writerGroupMemberRepository: Repository<WriterGroupMemberEntity>,
    @InjectRepository(MediaEditPermissionEntity)
    private readonly mediaEditPermissionRepository: Repository<MediaEditPermissionEntity>
  ) {}

  // SECTION Writer Group

  async create(input: CreateWriterGroupInput) {
    return this.writerGroupRepository.save(input);
  }

  async delete(input: DeleteWriterGroupInput) {
    return this.writerGroupRepository.delete({
      id: In(input.writerGroupIds),
    });
  }

  async update(input: UpdateWriterGroupInput) {
    const { id, ...rest } = input;
    return this.writerGroupRepository.update(id, rest);
  }

  async verifyWriterGroupOwnership(input: VerifyWriterGroupOwnershipInput) {
    const { groupIds, ownerId } = input;
    const result = await this.writerGroupRepository.find({
      select: {
        id: true,
      },
      where: {
        id: In(groupIds),
        owner: {
          id: ownerId,
        },
        status: StatusEnum.Active,
      },
    });
    return result.length === groupIds.length;
  }

  //!SECTION

  // SECTION Writer Group Member

  async addMembers(input: AddMemberToWriterGroupInput) {
    const { writers, group } = input;
    const flatWriterIds = destructIds(writers);
    const members = flatWriterIds.map((id) =>
      this.writerGroupMemberRepository.create({
        writer: {
          id,
        },
        writerGroup: {
          id: group.id,
        },
      })
    );
    return this.writerGroupMemberRepository.save(members);
  }

  async getMembers(
    input: GetWriterGroupMembersInput,
    selectField = COMMON_WRITER_GROUP_MEMBER_SELECT_FIELD
  ) {
    return await this.writerGroupMemberRepository.find({
      select: selectField,
      where: {
        writerGroup: {
          id: input.groupId,
        },
        writer: {
          id: input.ownerId,
        },
        status: StatusEnum.Active,
      },
    });
  }

  async deleteMembers(input: DeleteWriterGroupMembersInput) {
    return await this.writerGroupMemberRepository.delete({
      id: In(input.memberIds),
    });
  }

  async ensureMembersExist(input: EnsureMembersExist) {
    const { memberIds, groupId } = input;

    const result = await this.writerGroupMemberRepository.find({
      select: {
        id: true,
      },
      where: {
        writerGroup: {
          id: groupId,
        },
        writer: {
          id: In(memberIds),
        },
        status: StatusEnum.Active,
      },
    });

    return {
      isExist: result.length === memberIds.length,
      ids: destructIds(result),
    };
  }

  async addEditMediaPermission(input: AddEditMediaPermissionInput) {
    const { media, group } = input;

    const mediaEditPermission = media.map((item) =>
      this.mediaEditPermissionRepository.create({
        media: {
          id: item.id,
        },
        writerGroup: {
          id: group.id,
        },
      })
    );

    return await this.mediaEditPermissionRepository.save(mediaEditPermission);
  }

  async deleteEditMediaPermission(input: DeleteEditMediaPermissionInput) {
    return await this.mediaEditPermissionRepository.delete({
      id: In(input.ids),
    });
  }

  async verifyEditMediaPermission(input: VerifyEditMediaPermissionInput) {
    const writerGroupMember = await this.writerGroupMemberRepository.findOne({
      select: {
        writerGroupId: true,
      },
      where: {
        writerId: input.writerId,
        status: StatusEnum.Active,
      },
    });

    if (!writerGroupMember) return false;

    const result = await this.mediaEditPermissionRepository.findOne({
      select: {
        id: true,
      },
      where: {
        mediaId: In(input.mediaIds),
        writerGroupId: writerGroupMember.writerGroupId,
        status: StatusEnum.Active,
      },
    });

    return !!result;
  }

  async ensureMediaInGroupExist(input: EnsureMediaInGroupExistInput) {
    const { ids } = input;

    const result = await this.mediaEditPermissionRepository.find({
      select: {
        mediaId: true,
      },
      where: {
        mediaId: In(ids),
        status: StatusEnum.Active,
      },
    });

    return {
      isExist: result.length === ids.length,
      ids: result.map((item) => item.mediaId),
    };
  }

  //!SECTION
}
