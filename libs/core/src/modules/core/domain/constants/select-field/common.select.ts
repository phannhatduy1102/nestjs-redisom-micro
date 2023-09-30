import { FindOptionsSelect } from 'typeorm';
import { WriterGroupMemberEntity } from '../../entities';

export const COMMON_SELECT_FIELD = {
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export const COMMON_ACCOUNT_SELECT_FIELD = {
  ...COMMON_SELECT_FIELD,
  email: true,
  username: true,
  nickname: true,
  name: true,
  avatar: true,
  isVerifyEmail: true,
  isVerifyPhoneNumber: true,
  isBanned: true,
  bannedReason: true,
  phoneNumber: true,
};

export const COMMON_SUMMARY_ACCOUNT_SELECT_FIELD = {
  ...COMMON_SELECT_FIELD,
  email: true,
  username: true,
  nickname: true,
  name: true,
  avatar: true,
};

export const COMMON_WRITER_GROUP_MEMBER_SELECT_FIELD: FindOptionsSelect<WriterGroupMemberEntity> =
  {
    ...COMMON_SELECT_FIELD,
    writer: {
      ...COMMON_SUMMARY_ACCOUNT_SELECT_FIELD,
    },
    writerGroup: {
      id: true,
      owner: {
        id: true,
      },
    },
  };
