// eslint-disable-next-line import/prefer-default-export
export const handleError = (error) => {
  if (typeof error === 'object') {
    return error.message;
  }

  return error;
};
