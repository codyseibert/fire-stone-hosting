import { ApplicationContext } from '../createApplicationContext';
import { startServerPersistence } from '../persistence/startServerPersistence';
import { getServerPersistence } from '../persistence/getServerPersistence';
import { getNodePersistence } from '../persistence/getNodePersistence';
import { startServerCommand } from '../commands/startServerCommand';

type startServerInteractorOptions = {
  serverId: string;
  applicationContext: ApplicationContext;
};

export const startServerInteractor = async ({
  applicationContext,
  serverId,
}: startServerInteractorOptions) => {
  const server = await getServerPersistence({ applicationContext, serverId });
  const node = await getNodePersistence({
    applicationContext,
    nodeId: server.nodeId,
  });
  startServerPersistence({
    applicationContext,
    serverId,
  });
  await startServerCommand({ serverId: server.id, node });
};
