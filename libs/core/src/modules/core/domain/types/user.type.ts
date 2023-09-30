import { Subscription } from '.';

export type User = {
  id: string;
  userName: string;
  password: string;
  avatar: string;
  email: string;
  nickName: string;
  isBanned: boolean;
  bannedReason: string;
  subscription: Subscription;
};
