import { Schema } from 'redis-om';
import { commonSchema } from './common.schema';

export const GenreSchema = {
  key: 'Genre',
  repositoryName: 'RedisGenreRepository',
};

export const enum GenreFields {
  Name = 'name',
  Slug = 'slug',
  Avatar = 'avatar',
}

export const genreSchema = new Schema(GenreSchema.key, {
  name: { type: 'string', field: GenreFields.Name },
  slug: { type: 'string', field: GenreFields.Slug },
  avatar: { type: 'string', field: GenreFields.Avatar },
  ...commonSchema,
});
