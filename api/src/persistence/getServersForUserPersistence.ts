import { Nodes, Servers } from '@prisma/client';
import { ApplicationContext } from '../createApplicationContext';

type getServersForUserPersistenceOptions = {
  userId: String;
  applicationContext: ApplicationContext;
};

type getServersForUserPersistenceResponse = Pick<
  Servers,
  'id' | 'memoryPercent' | 'cpuPercent' | 'memory' | 'running' | 'port'
> & {
  nodeId: Nodes['id'];
  ip: Nodes['ip'];
};

export const getServersForUserPersistence = async ({
  applicationContext,
  userId,
}: getServersForUserPersistenceOptions): Promise<
  getServersForUserPersistenceResponse[]
> => {
  const servers: any[] = await applicationContext.db.$queryRaw`
    SELECT s.id, n.id AS nodeId, s.memoryPercent, s.cpuPercent, s.memory, s.running, s.port, n.ip 
    FROM "servers" AS s JOIN "nodes" AS n ON s.nodeId = n.id WHERE userId = ${userId} 
`;

  return servers;
};
