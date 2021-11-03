import { ApplicationContext } from "../../createApplicationContext";

type stopServerPersistenceOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const stopServerPersistence = async ({ applicationContext, serverId }: stopServerPersistenceOptions) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `running` = ? WHERE `id` = ?',
  );
  await statement.run(false, serverId);
  await statement.finalize();
};
