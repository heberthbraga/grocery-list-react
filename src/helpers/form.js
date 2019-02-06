export const hasFormError = (required, errors, type) => {
  return required && errors && errors[type];
};