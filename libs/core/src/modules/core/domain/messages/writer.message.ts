export const enum WriterMessage {
  GetByEmail = 'writerGetByEmail',
  Get = 'writerGet',
  Create = 'writerCreate',
}

export const enum WriterGroupMessage {
  Get = 'writerGroupGet',
  GetMembers = 'writerGroupGetMembers',
  Create = 'writerGroupCreate',
  AddMembers = 'writerGroupAddMembers',
  Update = 'writerGroupUpdate',
  Delete = 'writerGroupDelete',
  EnsureMembersExist = 'writerGroupEnsureMembersExist',
  VerifyWriterGroupOwnership = 'writerGroupVerifyWriterGroupOwnership',
  AddEditMediaPermission = 'writerGroupAddEditMediaPermission',
  DeleteEditMediaPermission = 'writerGroupDeleteEditMediaPermission',
  DeleteMembers = 'writerGroupDeleteMembers',
  VerifyEditMediaPermission = 'writerGroupVerifyEditMediaPermission',
  EnsureMediaInGroupExist = 'writerGroupEnsureMediaInGroupExist',
}
