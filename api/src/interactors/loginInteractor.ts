import { getUserPersistence } from '../persistence/getUserPersistence';
import { isValidPassword } from '../lib/passwordEncryption';
import { getSignedToken } from '../lib/jwt';

type loginInteractorOptions = {
  email: string;
  password: string;
};

export const loginInteractor = async ({
  email,
  password,
}: loginInteractorOptions) => {
  const user = await getUserPersistence({
    email,
  });

  if (!user) {
    throw new Error('user not found');
  }

  const isValid = await isValidPassword(password, user.password);

  if (!isValid) {
    throw new Error('invalid password');
  }

  const token = getSignedToken(user);

  return { token, user };
};
