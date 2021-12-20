import { Nodes, Servers } from '@prisma/client';
import { db } from './db';

type getServerPersistenceOptions = {
  serverId: string;
};

type getServerPersistenceRepsonse = Pick<
  Servers,
  | 'id'
  | 'restart'
  | 'runBackup'
  | 'memoryPercent'
  | 'cpuPercent'
  | 'memory'
  | 'running'
  | 'port'
> & {
  nodeId: Nodes['id'];
  ip: Nodes['ip'];
};

export const getServerPersistence = async ({
  serverId,
}: getServerPersistenceOptions): Promise<getServerPersistenceRepsonse | null> => {
  const server: any = await db.servers.findUnique({
    where: {
      id: serverId,
    },
    include: {
      node: true,
    },
  });

  return server;
};
