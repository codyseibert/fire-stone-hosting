import { ApplicationContext } from '../createApplicationContext';
import { getServerPersistence } from '../persistence/sqlite/getServerPersistence';
import { getNodePersistence } from '../persistence/sqlite/getNodePersistence';
import { restartServerCommand } from '../commands/restartServerCommand';
import { startServerPersistence } from '../persistence/sqlite/startServerPersistence';

type restartServerInteractorOptions = {
  serverId: String;
  applicationContext: ApplicationContext;
};

export const restartServerInteractor = async ({
  applicationContext,
  serverId,
}: restartServerInteractorOptions) => {
  const server = await getServerPersistence({ applicationContext, serverId });
  const node = await getNodePersistence({
    applicationContext,
    nodeId: server.nodeId,
  });
  await startServerPersistence({ applicationContext, serverId: server.id });
  await restartServerCommand({ server, node });
};
