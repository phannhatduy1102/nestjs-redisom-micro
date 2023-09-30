import { Schema } from 'redis-om';

export const SubscriptionSchema = {
  key: 'subscription',
  repositoryName: 'RedisSubscriptionRepository',
};

export const enum SubscriptionFields {
  Id = 'id',
  Name = 'name',
  Slug = 'slug',
  Duration = 'duration',
  Price = 'price',
  Avatar = 'avatar',
  Type = 'type',
  StatusId = 'statusId',
  StatusName = 'statusName',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  DeletedAt = 'deletedAt',
}

export const subscriptionSchema = new Schema(SubscriptionSchema.key, {
  id: { type: 'string', field: SubscriptionFields.Id },
  name: { type: 'string', field: SubscriptionFields.Name },
  slug: { type: 'string', field: SubscriptionFields.Slug },
  avatar: { type: 'string', field: SubscriptionFields.Avatar },
  duration: { type: 'number', field: SubscriptionFields.Duration },
  price: { type: 'number', field: SubscriptionFields.Price },
  type: { type: 'string', field: SubscriptionFields.Type },
  statusId: {
    type: 'string',
    path: '$.status.id',
    field: SubscriptionFields.StatusId,
  },
  statusName: {
    type: 'string',
    path: '$.status.name',
    field: SubscriptionFields.StatusName,
  },
  createdAt: { type: 'string', field: SubscriptionFields.CreatedAt },
  updatedAt: { type: 'string', field: SubscriptionFields.UpdatedAt },
  deletedAt: { type: 'string', field: SubscriptionFields.DeletedAt },
});
