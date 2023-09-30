import { isUUID } from 'class-validator';
import { IdFieldInput } from '../modules';

export const removeDuplicateId = (ids: IdFieldInput[]): IdFieldInput[] => {
  const uniqueIds: Set<string> = new Set();
  const resultArray: { id: string }[] = [];

  for (const item of ids) {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      resultArray.push(item);
    }
  }

  return resultArray;
};

export const destructIds = <T extends IdFieldInput>(ids: T[]): string[] => {
  return ids.map((item) => item.id);
};

export const filterOutExistingItems = <T extends string | number>(
  origin: T[],
  target: T[]
) => {
  return origin.filter((item) => !target.includes(item));
};

export const createIdMapObjects = <T extends string | number>(ids: T[]) => {
  if (ids.length === 0) return [];
  return ids.map((id) => ({ id }));
};

export const validateUUID = (ids: string[]) => {
  return ids.length === 0 ? false : ids.every((id) => isUUID(id));
};
