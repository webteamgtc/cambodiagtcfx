export const readPath = (path, data = {}) => {
  if (typeof path !== "string" || !path.trim()) return undefined;
  return path.split(".").reduce((acc, key) => acc?.[key], data);
};

const normalizeText = (value) =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

export const translationText = (key, fallback, data = {}) =>
  normalizeText(readPath(key, data)) ??
  normalizeText(data?.[key]) ??
  fallback;

export const translationTextByPath = (path, fallback, data = {}) => {
  return normalizeText(readPath(path, data)) ?? fallback;
};
