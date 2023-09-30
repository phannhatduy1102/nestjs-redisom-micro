import { Schema } from 'redis-om';
import { commonSchema } from './common.schema';

export const MediaSchema = {
  key: 'Media',
  repositoryName: 'RedisMediaRepository',
};

export const enum MediaFields {
  Slug = 'slug',
  Name = 'name',
  OtherName = 'otherName',
  Description = 'description',
  CoverImage = 'coverImage',
  LastedEpisode = 'lastedEpisode',
  Viewed = 'viewed',
  Yop = 'yop',
  TotalRating = 'totalRating',
  RatingCount = 'ratingCount',
  ReleaseDate = 'releaseDate',
  IsFree = 'isFree',
  Price = 'price',
  PricePerEpisode = 'pricePerEpisode',
  Author = 'author',
  FollowerCount = 'followerCount',
  Type = 'type',
  PostedBy = 'postedBy',
  CountryId = 'countryId',
  CountryName = 'countryName',
  SeriesIds = 'seriesIds',
  GenreIds = 'genreIds',
  EpisodeIds = 'episodeIds',
}

export const mediaSchema = new Schema(MediaSchema.key, {
  slug: { type: 'string', field: MediaFields.Slug },
  name: { type: 'string', field: MediaFields.Name },
  otherName: { type: 'string', field: MediaFields.OtherName },
  description: { type: 'text', field: MediaFields.Description },
  coverImage: { type: 'string', field: MediaFields.CoverImage },
  lastedEpisode: { type: 'number' },
  viewed: { type: 'number', field: MediaFields.Viewed },
  yop: { type: 'number', field: MediaFields.Yop },
  totalRating: { type: 'number', field: MediaFields.TotalRating },
  ratingCount: { type: 'number', field: MediaFields.RatingCount },
  releaseDate: { type: 'date', field: MediaFields.ReleaseDate },
  isFree: { type: 'boolean', field: MediaFields.IsFree },
  price: { type: 'number', field: MediaFields.Price },
  pricePerEpisode: { type: 'number', field: MediaFields.PricePerEpisode },
  author: { type: 'string', field: MediaFields.Author },
  followerCount: { type: 'number', field: MediaFields.FollowerCount },
  type: { type: 'string', field: MediaFields.Type },
  countryId: {
    type: 'string',
    path: `$.country.id`,
    field: MediaFields.CountryId,
  },
  countryName: {
    type: 'string',
    path: `$.country.name`,
    field: MediaFields.CountryName,
  },
  postedBy: {
    type: 'string',
    field: MediaFields.PostedBy,
  },
  seriesIds: {
    type: 'string[]',
    path: '$.series[*]',
    field: MediaFields.SeriesIds,
  },
  genreIds: {
    type: 'string[]',
    path: '$.genres[*]',
    field: MediaFields.GenreIds,
  },
  episodeIds: {
    type: 'string[]',
    path: '$.episode[*]',
    field: MediaFields.EpisodeIds,
  },
  ...commonSchema,
});
