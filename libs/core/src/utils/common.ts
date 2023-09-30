import { merge } from 'lodash';

export const transformSelectField = (
  selectField: any extends object ? any : never,
  addFields?: any extends object ? any : never,
  removeFields?: string[]
) => {
  const transformedSelectField = merge({}, selectField);
  if (addFields) {
    Object.keys(addFields).forEach((key) => {
      transformedSelectField[key] = addFields[key];
    });
  }
  if (removeFields) {
    removeFields.forEach((field) => {
      delete transformedSelectField[field];
    });
  }
  return transformedSelectField;
};

export const transformIdToObjectId = <T extends string | number>(id?: T) => {
  if (!id) return undefined;
  return { id };
};
