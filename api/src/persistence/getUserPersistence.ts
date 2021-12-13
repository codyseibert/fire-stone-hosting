import { ApplicationContext } from '../createApplicationContext';

type getUserPersistenceOptions = {
  email: string;
  applicationContext: ApplicationContext;
};

export const getUserPersistence = async ({
  applicationContext,
  email,
}: getUserPersistenceOptions) => {
  return applicationContext.db.users.findUnique({
    where: {
      email,
    },
  });
};
