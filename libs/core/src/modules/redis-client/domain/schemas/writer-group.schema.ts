import { Schema } from 'redis-om';
import { commonSchema } from './common.schema';

export const MediaGroupSchema = {
  key: 'MediaGroup',
  repositoryName: 'RedisMediaGroupRepository',
};

export const enum WriterGroupFields {
  Slug = 'slug',
  Name = 'name',
  CoverImage = 'coverImage',
  Description = 'description',
  OwnerId = 'ownerId',
  MemberIds = 'memberIds',
  MediaId = 'mediaId',
}

export const mediaGroupSchema = new Schema(MediaGroupSchema.key, {
  slug: { type: 'string', field: WriterGroupFields.Slug },
  name: { type: 'string', field: WriterGroupFields.Name },
  coverImage: { type: 'string', field: WriterGroupFields.CoverImage },
  description: { type: 'string', field: WriterGroupFields.Description },
  ownerId: { type: 'string', field: WriterGroupFields.OwnerId },
  memberIds: { type: 'string[]', field: WriterGroupFields.MemberIds },
  mediaId: { type: 'string[]', field: WriterGroupFields.MediaId },
  ...commonSchema,
});
