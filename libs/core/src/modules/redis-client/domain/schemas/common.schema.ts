import { SchemaDefinition } from 'redis-om';

export const enum CommonFields {
  Id = 'id',
  Slug = 'slug',
  Name = 'name',
  Email = 'email',
  Status = 'status',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  DeletedAt = 'deletedAt',
}

export const commonSchema: SchemaDefinition = {
  id: { type: 'string', field: CommonFields.Id },
  status: { type: 'string', field: CommonFields.Status },
  createdAt: { type: 'date', field: CommonFields.CreatedAt },
  updatedAt: { type: 'date', field: CommonFields.UpdatedAt },
  deletedAt: { type: 'date', field: CommonFields.DeletedAt },
};
