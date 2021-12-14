import { db } from './db';

type getUserPersistenceOptions = {
  email: string;
};

export const getUserPersistence = async ({
  email,
}: getUserPersistenceOptions) => {
  return db.users.findUnique({
    where: {
      email,
    },
  });
};
