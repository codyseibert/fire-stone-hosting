import { ApplicationContext } from "../../createApplicationContext";

export type User = {
  id: string;
  email: String;
  password: String;
}

type createUserPersistenceOptions = {
  user: User;
  applicationContext: ApplicationContext;
};


export const createUserPersistence = async ({ applicationContext, user }: createUserPersistenceOptions) => {
  const { id, email, password } = user;
  const statement = await (await applicationContext.db).prepare(
    'INSERT INTO `users` (`id`, `email`, `password`) VALUES (?, ?, ?)',
  );
  await statement.run(id, email, password);
  await statement.finalize();
};
