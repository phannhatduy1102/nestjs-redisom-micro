import { CommonEntityType } from './common.type';

export type Writer = {
  id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  isVerifiedEmail: boolean;
  nickname?: string;
  name?: string;
  isBanned: boolean;
  bannedReason?: string;
  phoneNumber: string;
  isVerifiedPhoneNumber: boolean;
} & CommonEntityType;
