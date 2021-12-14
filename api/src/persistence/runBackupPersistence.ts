import { db } from './db';

type runBackupPersistenceOptions = {
  serverId: string;
};

export const runBackupPersistence = async ({
  serverId,
}: runBackupPersistenceOptions) => {
  await db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      runBackup: true,
    },
  });
};
