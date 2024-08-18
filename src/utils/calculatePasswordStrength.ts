export const calculatePasswordStrength = (password: string) => {
  let strength = 0;

  if (/\d/.test(password)) strength++;

  if (/[A-Z]/.test(password)) strength++;

  if (/[a-z]/.test(password)) strength++;

  if (/[@$!%*?&#]/.test(password)) strength++;

  return strength;
};
