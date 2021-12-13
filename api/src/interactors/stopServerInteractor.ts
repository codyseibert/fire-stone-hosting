import { stopServerPersistence } from '../persistence/stopServerPersistence';
import { ApplicationContext } from '../createApplicationContext';
import { getNodePersistence } from '../persistence/getNodePersistence';
import { getServerPersistence } from '../persistence/getServerPersistence';
import { stopServerCommand } from '../commands/stopServerCommand';

type stopServerInteractorOptions = {
  serverId: string;
  applicationContext: ApplicationContext;
};

export const stopServerInteractor = async ({
  applicationContext,
  serverId,
}: stopServerInteractorOptions) => {
  const server = await getServerPersistence({ applicationContext, serverId });
  const node = await getNodePersistence({
    applicationContext,
    nodeId: server.nodeId,
  });
  await stopServerPersistence({
    applicationContext,
    serverId,
  });
  await stopServerCommand({ node, serverId: server.id });
};
