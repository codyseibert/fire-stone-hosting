import { ApplicationContext } from "../createApplicationContext";

type runBackupInteractorOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const runBackupInteractor = async ({ applicationContext, serverId }: runBackupInteractorOptions) =>
  applicationContext.persistence.runBackup({
    applicationContext,
    serverId,
  });
