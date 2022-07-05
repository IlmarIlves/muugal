
export const validateSamePassword = (otherPassword: string | undefined) => (password: string) => {
  const isSame = password === (otherPassword !== undefined ? otherPassword : "");

  if (!isSame) {
    return `Entered passwords do not match`;
  }

  return true;
};
