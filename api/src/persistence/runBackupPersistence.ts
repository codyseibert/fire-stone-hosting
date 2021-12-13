import { ApplicationContext } from '../createApplicationContext';

type runBackupPersistenceOptions = {
  serverId: string;
  applicationContext: ApplicationContext;
};

export const runBackupPersistence = async ({
  applicationContext,
  serverId,
}: runBackupPersistenceOptions) => {
  await applicationContext.db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      runBackup: true,
    },
  });
};
