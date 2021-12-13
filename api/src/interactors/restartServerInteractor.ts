import { ApplicationContext } from '../createApplicationContext';
import { getServerPersistence } from '../persistence/getServerPersistence';
import { getNodePersistence } from '../persistence/getNodePersistence';
import { restartServerCommand } from '../commands/restartServerCommand';
import { startServerPersistence } from '../persistence/startServerPersistence';

type restartServerInteractorOptions = {
  serverId: string;
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
  await restartServerCommand({ serverId: server.id, node });
};
