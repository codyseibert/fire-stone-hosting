import { Nodes, Servers } from '@prisma/client';
import { ApplicationContext } from '../createApplicationContext';

type getServerPersistenceOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
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
  applicationContext,
  serverId,
}: getServerPersistenceOptions): Promise<getServerPersistenceRepsonse | null> => {
  const servers: any[] = await applicationContext.db.$queryRaw`
    SELECT s.id AS id, n.id AS nodeId, s.restart, s.runBackup, s.memoryPercent, 
           s.cpuPercent, s.memory, s.running, s.port, n.ip 
    FROM "servers" AS s JOIN "nodes" AS n ON s.nodeId = n.id 
    WHERE s.id = ${serverId}
  `;

  return servers.length ? servers[0] : null;
};
