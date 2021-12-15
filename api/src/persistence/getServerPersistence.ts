import { Nodes, Servers } from '@prisma/client';
import { db } from './db';

type getServerPersistenceOptions = {
  serverId: String;
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
  // TODO: refactor to use primsa models instead of queryRaw
  const servers: any[] = await db.$queryRaw`
    SELECT s.id AS id, n.id AS nodeId, s.version, s.restart, s.run_backup as runBackup, s.memory_percent as memoryPercent, 
           s.cpu_percent as cpuPercent, s.memory, s.running, s.port, n.ip 
    FROM "servers" AS s JOIN "nodes" AS n ON s.node_id = n.id 
    WHERE s.id = ${serverId}
  `;

  if (servers.length === 0) {
    return null;
  }

  // temp hack to keep return value consistent with other queries
  const server = servers[0];
  server.cpuPercent = server.cpupercent;
  server.nodeId = server.nodeid;
  server.memoryPercent = server.memorypercent;
  server.runBackup = server.runbackup;
  delete server.cpupercent;
  delete server.nodeid;
  delete server.memorypercent;
  delete server.runbackup;
  return server;
};
