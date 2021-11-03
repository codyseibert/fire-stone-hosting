import { ApplicationContext } from "../../createApplicationContext";

type Server = {
  serverId: String;
  nodeId: String;
  port: String;
  memory: String;
  userId: String;
}

type createServerPersistenceOptions = {
  node: Server;
  applicationContext: ApplicationContext;
};


export const createServerPersistence = async ({ applicationContext, server }: createServerPersistenceOptions) => {
  const { serverId, nodeId, port, memory, userId } = server;
  const statement = await (await applicationContext.db).prepare(
    'INSERT INTO `servers` (`id`, `nodeId`, `port`, `memory`, `running`, `userId`) VALUES (?, ?, ?, ?, ?, ?)',
  );
  await statement.run(serverId, nodeId, port, memory, true, userId);
  await statement.finalize();
};
