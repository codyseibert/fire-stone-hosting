import { db } from './db';

type setServerHealthPersistenceOptions = {
  serverId: string;
  cpuPercent: string;
  memoryPercent: string;
};

export const setServerHealthPersistence = async ({
  serverId,
  cpuPercent,
  memoryPercent,
}: setServerHealthPersistenceOptions) => {
  await db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      cpuPercent,
      memoryPercent,
    },
  });
};
