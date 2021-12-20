import { Nodes, Servers } from '@prisma/client';
import { db } from './db';

type getServersForUserPersistenceOptions = {
  userId: string;
};

type getServersForUserPersistenceResponse = Pick<
  Servers,
  'id' | 'memoryPercent' | 'cpuPercent' | 'memory' | 'running' | 'port'
> & {
  nodeId: Nodes['id'];
  ip: Nodes['ip'];
};

export const getServersForUserPersistence = async ({
  userId,
}: getServersForUserPersistenceOptions): Promise<
  getServersForUserPersistenceResponse[]
> => {
  const servers: any[] = await db.servers.findMany({
    where: {
      userId,
    },
    include: {
      node: true,
    },
  });

  return servers;
};
