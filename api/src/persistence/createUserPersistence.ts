import { db } from './db';
import { getPasswordHash } from '../lib/passwordEncryption';

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

  const passwordHash = await getPasswordHash(password);

  await db.users.create({
    data: {
      id,
      email,
      password: passwordHash,
    },
  });
};
