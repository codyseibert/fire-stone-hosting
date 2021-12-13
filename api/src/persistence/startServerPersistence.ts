import { ApplicationContext } from '../createApplicationContext';

type startServerPersistenceOptions = {
  serverId: string;
  applicationContext: ApplicationContext;
};

export const startServerPersistence = async ({
  applicationContext,
  serverId,
}: startServerPersistenceOptions) => {
  await applicationContext.db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      running: true,
    },
  });
};
