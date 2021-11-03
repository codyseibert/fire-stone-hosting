import { ApplicationContext } from "../../createApplicationContext";

type getServerPersistenceOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const getServerPersistence = async ({ applicationContext, serverId }: getServerPersistenceOptions) => {
  const servers = await (await applicationContext.db).all(
    'SELECT s.id as serverId, n.id as nodeId, s.memoryPercent, s.cpuPercent, s.memory, s.running, s.port, n.ip from `servers` as s JOIN `nodes` as n ON s.`nodeId` = n.`id` WHERE `serverId` = ?',
    [serverId],
  );
  return servers.length ? servers[0] : null;
};
