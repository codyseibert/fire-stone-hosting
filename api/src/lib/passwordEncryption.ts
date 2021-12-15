import bcrypt from 'bcryptjs';

export const getPasswordHash = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, 10);
};

export const isValidPassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return bcrypt.compareSync(password, passwordHash);
};
