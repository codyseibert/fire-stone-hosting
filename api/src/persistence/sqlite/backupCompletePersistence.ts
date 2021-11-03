import { ApplicationContext } from "../../createApplicationContext";

type backupCompletePersistenceOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const backupCompletePersistence = async ({ applicationContext, serverId }: backupCompletePersistenceOptions) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `runBackup` = ? WHERE `id` = ?',
  );
  await statement.run(false, serverId);
  await statement.finalize();
};
