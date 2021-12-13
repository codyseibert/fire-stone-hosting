import { ApplicationContext } from '../createApplicationContext';

export type User = {
  id: string;
  email: string;
  password: string;
};

type createUserPersistenceOptions = {
  user: User;
  applicationContext: ApplicationContext;
};

export const createUserPersistence = async ({
  applicationContext,
  user,
}: createUserPersistenceOptions) => {
  const { id, email, password } = user;

  await applicationContext.db.users.create({
    data: {
      id,
      email,
      password,
    },
  });
};
