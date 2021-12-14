import { db } from './db';

type stopServerPersistenceOptions = {
  serverId: string;
};

export const stopServerPersistence = async ({
  serverId,
}: stopServerPersistenceOptions) => {
  await db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      running: false,
    },
  });
};
