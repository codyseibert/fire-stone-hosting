import { Nodes, Servers } from '@prisma/client';
import { db } from './db';

type getServersForUserPersistenceOptions = {
  userId: String;
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
  // TODO: refactor to use primsa models instead of queryRaw
  const servers: any[] = await db.$queryRaw`
    SELECT s.id, n.id AS nodeId, s.memory_percent as memoryPercent, s.cpu_percent as cpuPercent, s.memory, s.running, s.port, n.ip 
    FROM "servers" AS s JOIN "nodes" AS n ON s.node_id = n.id WHERE user_id = ${userId} 
`;

  // temp hack
  return servers.map(server => {
    server.cpuPercent = server.cpupercent;
    server.nodeId = server.nodeid;
    server.memoryPercent = server.memorypercent;
    server.runBackup = server.runbackup;
    delete server.cpupercent;
    delete server.nodeid;
    delete server.memorypercent;
    delete server.runbackup;
    return server;
  });
};
