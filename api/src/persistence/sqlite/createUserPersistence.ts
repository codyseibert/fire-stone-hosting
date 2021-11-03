import { ApplicationContext } from "../../createApplicationContext";

type User = {
  accountId: String;
  email: String;
  password: String;
}

type createUserPersistenceOptions = {
  user: User;
  applicationContext: ApplicationContext;
};


export const createUserPersistence = async ({ applicationContext, user }: createUserPersistenceOptions) => {
  const { accountId, email, password } = user;
  const statement = await (await applicationContext.db).prepare(
    'INSERT INTO `users` (`id`, `email`, `password`) VALUES (?, ?, ?)',
  );
  await statement.run(accountId, email, password);
  await statement.finalize();
};
