import { Schema } from 'redis-om';

export const UserSchema = {
  key: 'User',
  repositoryName: 'RedisUserRepository',
};

export const enum UserFields {
  Username = 'userName',
  Password = 'password',
  Avatar = 'avatar',
  Email = 'email',
  NickName = 'nickName',
  IsBanned = 'isBanned',
  BannedReason = 'bannedReason',
  SubscriptionId = 'subscriptionId',
  SubscriptionName = 'subscriptionName',
  MediaFavorite = 'mediaFavorite',
}

export const userSchema = new Schema(UserSchema.key, {
  userName: { type: 'string', field: UserFields.Username },
  password: { type: 'string', field: UserFields.Password },
  avatar: { type: 'string', field: UserFields.Avatar },
  email: { type: 'string', field: UserFields.Email },
  nickName: { type: 'string', field: UserFields.NickName },
  isBanned: { type: 'boolean', field: UserFields.IsBanned },
  bannedReason: { type: 'string', field: UserFields.BannedReason },
  mediaFavorite: { type: 'string[]', field: UserFields.MediaFavorite },
  subscriptionId: {
    type: 'string',
    field: UserFields.SubscriptionId,
    path: '$.subscription.id',
  },
  subscriptionName: {
    type: 'string',
    field: UserFields.SubscriptionName,
    path: '$.subscription.name',
  },
});
