import { db } from './db';

type startServerPersistenceOptions = {
  serverId: string;
};

export const startServerPersistence = async ({
  serverId,
}: startServerPersistenceOptions) => {
  await db.servers.update({
    where: {
      id: serverId,
    },
    data: {
      running: true,
    },
  });
};
