import { StatusEnum } from '../constants';

export type Nullable<T> = T | null;

export type IdName<T = string> = {
  id: T;
  name: string;
};

export type IdNameWithNullId<T = string> = {
  id: T | null;
  name: string;
};

export type QueryType = 'redis' | 'database';

export type IdField = {
  id: string;
};

export type EnsureSlugExist<T = string> = {
  isExist: boolean;
  ids: T[];
};

export type PickPartial<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type CommonEntityType = {
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
