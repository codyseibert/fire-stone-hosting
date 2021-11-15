import { Server } from '../../models/Server';
import { ApplicationContext } from '../../createApplicationContext';

type createServerPersistenceOptions = {
  server: Server;
  applicationContext: ApplicationContext;
};

export const createServerPersistence = async ({
  applicationContext,
  server,
}: createServerPersistenceOptions) => {
  const { id, nodeId, port, memory, userId } = server;
  const statement = await (await applicationContext.db).prepare(
    'INSERT INTO `servers` (`id`, `nodeId`, `port`, `memory`, `running`, `userId`) VALUES (?, ?, ?, ?, ?, ?)',
  );
  await statement.run(id, nodeId, port, memory, true, userId);
  await statement.finalize();
};
