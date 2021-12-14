import { db } from './db';
export type User = {
  id: string;
  email: string;
  password: string;
};

type createUserPersistenceOptions = {
  user: User;
};

export const createUserPersistence = async ({
  user,
}: createUserPersistenceOptions) => {
  const { id, email, password } = user;

  await db.users.create({
    data: {
      id,
      email,
      password,
    },
  });
};
