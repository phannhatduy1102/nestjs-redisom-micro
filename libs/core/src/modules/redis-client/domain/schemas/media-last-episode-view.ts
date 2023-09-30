import { Schema } from 'redis-om';
import { commonSchema } from './common.schema';

export const LastEpisodeViewSchema = {
  key: 'LastEpisodeView',
  repositoryName: 'RedisLastEpisodeViewRepository',
};

export const enum LastEpisodeViewFields {
  UserId = 'userId',
  MediaId = 'mediaId',
  EpisodeId = 'episodeId',
  LastPosition = 'lastPosition',
  LastDeviceHeight = 'lastDeviceHeight',
}

export const lastEpisodeViewSchema = new Schema(LastEpisodeViewSchema.key, {
  userId: { type: 'string', field: LastEpisodeViewFields.UserId },
  mediaId: { type: 'string', field: LastEpisodeViewFields.MediaId },
  episodeId: { type: 'string', field: LastEpisodeViewFields.EpisodeId },
  lastPosition: { type: 'number', field: LastEpisodeViewFields.LastPosition },
  lastDeviceHeight: {
    type: 'number',
    field: LastEpisodeViewFields.LastDeviceHeight,
  },
  ...commonSchema,
});
