import { ApplicationContext } from "../../createApplicationContext";

type getUserPersistenceOptions = {
  email: String;
  applicationContext: ApplicationContext;
};

export const getUserPersistence = async ({ applicationContext, email }: getUserPersistenceOptions) => {
  const users = await (await applicationContext.db).all(
    'SELECT * from `users` WHERE `email` = ?',
    [email],
  );
  return users.length ? users[0] : null;
};
