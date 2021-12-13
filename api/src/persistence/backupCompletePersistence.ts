import { ApplicationContext } from '../createApplicationContext';

type backupCompletePersistenceOptions = {
  serverId: string;
  applicationContext: ApplicationContext;
};

export const backupCompletePersistence = async ({
  applicationContext,
  serverId,
}: backupCompletePersistenceOptions) => {
  await applicationContext.db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      runBackup: false,
    },
  });
};
