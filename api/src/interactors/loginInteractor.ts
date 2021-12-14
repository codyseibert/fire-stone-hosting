import * as jwt from 'jsonwebtoken';
import { getUserPersistence } from '../persistence/getUserPersistence';

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
    throw new Error('invalid login');
  }

  if (user.password !== password) {
    throw new Error('invalid login');
  }

  const token = jwt.sign(user, process.env.JWT_SECRET || 'testing');
  return { token, user };
};
