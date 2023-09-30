import { Schema } from 'redis-om';

export const CountrySchema = {
  key: 'country',
  repositoryName: 'RedisCountryRepository',
};

export const enum CountryFields {
  Id = 'id',
  Name = 'name',
  Slug = 'slug',
  Avatar = 'avatar',
  StatusId = 'statusId',
  StatusName = 'statusName',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  DeletedAt = 'deletedAt',
}

export const countrySchema = new Schema(CountrySchema.key, {
  id: { type: 'string', field: CountryFields.Id },
  name: { type: 'string', field: CountryFields.Name },
  slug: { type: 'string', field: CountryFields.Slug },
  avatar: { type: 'string', field: CountryFields.Avatar },
  statusId: {
    type: 'string',
    path: '$.status.id',
    field: CountryFields.StatusId,
  },
  statusName: {
    type: 'string',
    path: '$.status.name',
    field: CountryFields.StatusName,
  },
  createdAt: { type: 'string', field: CountryFields.CreatedAt },
  updatedAt: { type: 'string', field: CountryFields.UpdatedAt },
  deletedAt: { type: 'string', field: CountryFields.DeletedAt },
});
