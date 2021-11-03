import { ApplicationContext } from "../../createApplicationContext";

type runBackupPersistenceOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};


export const runBackupPersistence = async ({ applicationContext, serverId }: runBackupPersistenceOptions) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `runBackup` = ? WHERE `id` = ?',
  );
  await statement.run(true, serverId);
  await statement.finalize();
};
