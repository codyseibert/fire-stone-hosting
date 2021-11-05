import { ApplicationContext } from "../../createApplicationContext";

export type Server = {
  id: string;
  nodeId: string;
  port: number;
  memory: number;
  userId: string;
}

type createServerPersistenceOptions = {
  server: Server;
  applicationContext: ApplicationContext;
};


export const createServerPersistence = async ({ applicationContext, server }: createServerPersistenceOptions) => {
  const { id, nodeId, port, memory, userId } = server;
  const statement = await (await applicationContext.db).prepare(
    'INSERT INTO `servers` (`id`, `nodeId`, `port`, `memory`, `running`, `userId`) VALUES (?, ?, ?, ?, ?, ?)',
  );
  await statement.run(id, nodeId, port, memory, true, userId);
  await statement.finalize();
};
