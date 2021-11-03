import { ApplicationContext } from "../../createApplicationContext";

type startServerPersistenceOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const startServerPersistence = async ({ applicationContext, serverId }: startServerPersistenceOptions) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `running` = ? WHERE `id` = ?',
  );
  await statement.run(true, serverId);
  await statement.finalize();
};
