export function deepMergeMessages(base, override) {
  if (!override || typeof override !== "object" || Array.isArray(override)) {
    return base;
  }

  const result = { ...base };

  for (const key of Object.keys(override)) {
    const overrideValue = override[key];
    const baseValue = base?.[key];

    if (
      overrideValue &&
      typeof overrideValue === "object" &&
      !Array.isArray(overrideValue) &&
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMergeMessages(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result;
}
