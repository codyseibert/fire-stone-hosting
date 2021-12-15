import bcrypt from 'bcryptjs';

export const getPasswordHash = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const isValidPassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
