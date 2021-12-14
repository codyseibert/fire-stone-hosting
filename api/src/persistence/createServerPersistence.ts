import { Server } from '../models/Server';
import { db } from './db';

type createServerPersistenceOptions = {
  server: Server;
};

export const createServerPersistence = async ({
  server,
}: createServerPersistenceOptions) => {
  const { id, nodeId, port, version, memory, userId } = server;

  await db.servers.create({
    data: {
      id,
      nodeId,
      port,
      memory,
      version,
      running: true,
      userId,
    },
  });
};
