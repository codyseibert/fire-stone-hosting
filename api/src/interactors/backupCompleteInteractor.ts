import { ApplicationContext } from "../createApplicationContext";

type backupCompleteInteractorOptions = {
  serverId: string;
  applicationContext: ApplicationContext;
};

export const backupCompleteInteractor = async ({ applicationContext, serverId }: backupCompleteInteractorOptions) =>
  applicationContext.persistence.backupComplete({
    applicationContext,
    serverId,
  });
