import { Server } from '../models/Server';
import { ApplicationContext } from '../createApplicationContext';

type createServerPersistenceOptions = {
  server: Server;
  applicationContext: ApplicationContext;
};

export const createServerPersistence = async ({
  applicationContext,
  server,
}: createServerPersistenceOptions) => {
  const { id, nodeId, port, memory, userId } = server;

  await applicationContext.db.servers.create({
    data: {
      id,
      nodeId,
      port,
      memory,
      running: true,
      userId,
    },
  });
};
