import { Schema } from 'redis-om';
import { commonSchema } from './common.schema';

export const WriterSchema = {
  key: 'Writer',
  repositoryName: 'RedisWriterRepository',
};

export const enum WriterFields {
  Username = 'username',
  Password = 'password',
  Email = 'email',
  Avatar = 'avatar',
  IsVerifiedEmail = 'isVerifiedEmail',
  Nickname = 'nickname',
  Name = 'name',
  IsBanned = 'isBanned',
  BannedReason = 'bannedReason',
  PhoneNumber = 'phoneNumber',
  IsVerifiedPhoneNumber = 'isVerifiedPhoneNumber',
}

export const writerSchema = new Schema(WriterSchema.key, {
  username: { type: 'string', field: WriterFields.Username },
  password: { type: 'string', field: WriterFields.Password },
  email: { type: 'string', field: WriterFields.Email },
  avatar: { type: 'string', field: WriterFields.Avatar },
  isVerifiedEmail: { type: 'boolean', field: WriterFields.IsVerifiedEmail },
  nickname: { type: 'string', field: WriterFields.Nickname },
  name: { type: 'string', field: WriterFields.Name },
  isBanned: { type: 'boolean', field: WriterFields.IsBanned },
  bannedReason: { type: 'string', field: WriterFields.BannedReason },
  phoneNumber: { type: 'string', field: WriterFields.PhoneNumber },
  isVerifiedPhoneNumber: {
    type: 'boolean',
    field: WriterFields.IsVerifiedPhoneNumber,
  },
  ...commonSchema,
});
