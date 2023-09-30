export const removeAllUndefinedOrNull = <T extends object>(
  obj: T,
  includeArray = false
) => {
  const newObj = { ...obj };
  Object.keys(obj).forEach((key) => {
    const objectKey = key as keyof T;
    if (
      obj[objectKey] === undefined ||
      obj[objectKey] === null ||
      (includeArray &&
        Array.isArray(obj[objectKey]) &&
        (obj[objectKey] as []).length === 0)
    ) {
      delete newObj[objectKey];
    }
  });
  return newObj;
};

export const removeObjectPropertyByKey = <T extends object>(
  origin: T,
  keys: (keyof T)[]
) => {
  const obj = { ...origin };
  keys.forEach((element) => {
    delete obj[element];
  });
  return obj;
};
