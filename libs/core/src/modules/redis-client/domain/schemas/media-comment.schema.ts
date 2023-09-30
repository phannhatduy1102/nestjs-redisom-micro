import { Schema } from 'redis-om';

export const CommentSchema = {
  key: 'comment',
  repositoryName: 'RedisCommentRepository',
};

export const enum CommentFields {
  Id = 'id',
  Content = 'content',
  UserId = 'userId',
  ParentId = 'parentId',
  StatusId = 'statusId',
  Liked = 'liked',
  ReplyCount = 'replyCount',
  StatusName = 'statusName',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  DeletedAt = 'deletedAt',
}

export const commentSchema = new Schema(CommentSchema.key, {
  id: { type: 'string', field: CommentFields.Id },
  content: { type: 'string', field: CommentFields.Content },
  liked: { type: 'string[]', field: CommentFields.Liked },
  userId: { type: 'string', field: CommentFields.UserId },
  parentId: { type: 'string', field: CommentFields.ParentId },
  replyCount: { type: 'number', field: CommentFields.ReplyCount },
  statusId: {
    type: 'string',
    path: '$.status.id',
    field: CommentFields.StatusId,
  },
  statusName: {
    type: 'string',
    path: '$.status.name',
    field: CommentFields.StatusName,
  },
  createdAt: { type: 'string', field: CommentFields.CreatedAt },
  updatedAt: { type: 'string', field: CommentFields.UpdatedAt },
  deletedAt: { type: 'string', field: CommentFields.DeletedAt },
});
