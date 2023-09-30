import { Schema } from 'redis-om';
import { commonSchema } from './common.schema';

export const MediaEpisodeSchema = {
  key: 'MediaEpisode',
  repositoryName: 'RedisMediaEpisodeRepository',
};

export const enum MediaEpisodeFields {
  Name = 'name',
  Slug = 'slug',
  CoverImage = 'coverImage',
  Description = 'description',
  EpisodeNumber = 'episodeNumber',
  EpisodeType = 'episodeType',
  Content = 'content',
  Price = 'price',
  IsFree = 'isFree',
  ProtectedTime = 'protectedTime',
  MediaId = 'mediaId',
  Videos = 'videos',
  Images = 'images',
  Viewed = 'viewed',
}

export const mediaEpisodeSchema = new Schema(MediaEpisodeSchema.key, {
  name: { type: 'string', field: MediaEpisodeFields.Name },
  slug: { type: 'string', field: MediaEpisodeFields.Slug },
  coverImage: { type: 'string', field: MediaEpisodeFields.CoverImage },
  description: { type: 'text', field: MediaEpisodeFields.Description },
  episodeNumber: { type: 'number', field: MediaEpisodeFields.EpisodeNumber },
  episodeType: { type: 'string', field: MediaEpisodeFields.EpisodeType },
  content: { type: 'text', field: MediaEpisodeFields.Content },
  videos: { type: 'string', field: MediaEpisodeFields.Videos },
  images: { type: 'string', field: MediaEpisodeFields.Images },
  price: { type: 'number', field: MediaEpisodeFields.Price },
  viewed: { type: 'number', field: MediaEpisodeFields.Viewed },
  isFree: { type: 'boolean', field: MediaEpisodeFields.IsFree },
  protectedTime: { type: 'number', field: MediaEpisodeFields.ProtectedTime },
  mediaId: { type: 'string', field: MediaEpisodeFields.MediaId },
  ...commonSchema,
});
