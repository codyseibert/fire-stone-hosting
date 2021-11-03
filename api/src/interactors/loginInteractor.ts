import * as jwt from 'jsonwebtoken';
import { ApplicationContext } from "../createApplicationContext";

type loginInteractorOptions = {
  email: String;
  password: String;
  applicationContext: ApplicationContext;
};

export const loginInteractor = async ({ applicationContext, email, password }: loginInteractorOptions) => {
  const user = await applicationContext.persistence.getUser({
    applicationContext,
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
