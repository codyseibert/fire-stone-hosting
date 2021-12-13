import { ApplicationContext } from '../createApplicationContext';

type stopServerPersistenceOptions = {
  serverId: string;
  applicationContext: ApplicationContext;
};

export const stopServerPersistence = async ({
  applicationContext,
  serverId,
}: stopServerPersistenceOptions) => {
  await applicationContext.db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      running: false,
    },
  });
};
