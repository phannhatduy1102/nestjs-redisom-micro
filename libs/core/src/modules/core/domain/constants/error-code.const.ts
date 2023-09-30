export const MESSAGE_ERROR_CODE = {
  // Common
  CLIENT_ERROR: 1000,
  SLUG_IS_EXIST: 1001,
  ACCOUNT_IS_BANNED: 1002,
  EMAIL_IS_EXIST: 1003,

  // Not found
  NOT_FOUND_MEDIA: 1100,
  NOT_FOUND_MEDIA_LIST: 1101,
  NOT_FOUND_WRITER: 1102,
  NOT_FOUND_GENRE: 1103,

  // Media
  MEDIA_SLUG_IS_EXIST: 1200,
  EPISODE_NUMBER_IS_EXIST: 1201,

  // Writer
  NO_OWNERSHIP_PERMISSION: 1300,
  WRITER_ALREADY_IN_GROUP: 1301,
  MEDIA_ALREADY_IN_GROUP: 1302,

  // Unauthorized
  PASSWORD_OR_EMAIL_INVALID: 1400,
};

export const MAPPED_ERROR_CODE = {
  400: [
    MESSAGE_ERROR_CODE.CLIENT_ERROR,
    MESSAGE_ERROR_CODE.MEDIA_SLUG_IS_EXIST,
    MESSAGE_ERROR_CODE.NO_OWNERSHIP_PERMISSION,
    MESSAGE_ERROR_CODE.WRITER_ALREADY_IN_GROUP,
    MESSAGE_ERROR_CODE.SLUG_IS_EXIST,
    MESSAGE_ERROR_CODE.MEDIA_ALREADY_IN_GROUP,
    MESSAGE_ERROR_CODE.EPISODE_NUMBER_IS_EXIST,
    MESSAGE_ERROR_CODE.EMAIL_IS_EXIST,
  ],
  401: [MESSAGE_ERROR_CODE.PASSWORD_OR_EMAIL_INVALID],

  404: [
    MESSAGE_ERROR_CODE.NOT_FOUND_MEDIA,
    MESSAGE_ERROR_CODE.NOT_FOUND_MEDIA_LIST,
    MESSAGE_ERROR_CODE.NOT_FOUND_WRITER,
    MESSAGE_ERROR_CODE.NOT_FOUND_GENRE,
  ],
};

export const QUERY_FAILED_ERROR_CODE = {
  UNIQUE_VIOLATION: '23505',
};