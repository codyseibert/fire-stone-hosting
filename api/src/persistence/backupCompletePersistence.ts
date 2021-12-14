import { db } from './db';

type backupCompletePersistenceOptions = {
  serverId: string;
};

export const backupCompletePersistence = async ({
  serverId,
}: backupCompletePersistenceOptions) => {
  await db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      runBackup: false,
    },
  });
};
