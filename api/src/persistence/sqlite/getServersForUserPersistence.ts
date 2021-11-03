import { ApplicationContext } from "../../createApplicationContext";

type getServersForUserPersistenceOptions = {
  userId: String;
  applicationContext: ApplicationContext;
};

export const getServersForUserPersistence = async ({ applicationContext, userId }: getServersForUserPersistenceOptions) =>
  (await applicationContext.db).all(
    'SELECT s.id, n.id as nodeId, s.memoryPercent, s.cpuPercent, s.memory, s.running, s.port, n.ip from `servers` as s JOIN `nodes` as n ON s.`nodeId` = n.`id` WHERE `userId` = ?',
    [userId],
  );
