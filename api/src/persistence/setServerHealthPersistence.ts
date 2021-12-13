import { ApplicationContext } from '../createApplicationContext';

type setServerHealthPersistenceOptions = {
  serverId: string;
  cpuPercent: string;
  memoryPercent: string;
  applicationContext: ApplicationContext;
};

export const setServerHealthPersistence = async ({
  applicationContext,
  serverId,
  cpuPercent,
  memoryPercent,
}: setServerHealthPersistenceOptions) => {
  await applicationContext.db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      cpuPercent,
      memoryPercent,
    },
  });
};
