export const iterateObjects = <T>(
  obj: Object,
  callback: ([key, value]: [string, T]) => void
) => {
  Object.entries(obj).forEach(callback);
};
