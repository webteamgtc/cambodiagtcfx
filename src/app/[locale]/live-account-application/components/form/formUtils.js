export function getFieldError(errors, name, showErrors = false, touched = {}) {
  if (!errors[name]) return undefined;
  if (showErrors || touched[name]) return errors[name];
  return undefined;
}

export function hasFieldError(errors, name, showErrors = false, touched = {}) {
  return Boolean(getFieldError(errors, name, showErrors, touched));
}
