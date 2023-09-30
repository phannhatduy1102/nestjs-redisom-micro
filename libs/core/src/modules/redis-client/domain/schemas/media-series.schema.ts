import { Schema } from 'redis-om';
import { commonSchema } from './common.schema';

export const MediaSeriesSchema = {
  key: 'MediaSeries',
  repositoryName: 'RedisMediaSeriesRepository',
};

export const enum MediaSeriesFields {
  Name = 'name',
  Slug = 'slug',
  Avatar = 'avatar',
  Description = 'description',
}

export const mediaSeriesSchema = new Schema(MediaSeriesSchema.key, {
  name: { type: 'string', field: MediaSeriesFields.Name },
  slug: { type: 'string', field: MediaSeriesFields.Slug },
  avatar: { type: 'string', field: MediaSeriesFields.Avatar },
  description: { type: 'string', field: MediaSeriesFields.Description },
  ...commonSchema,
});
