import { stopServerPersistence } from '../persistence/sqlite/stopServerPersistence';
import { ApplicationContext } from '../createApplicationContext';
import { getNodePersistence } from '../persistence/sqlite/getNodePersistence';
import { getServerPersistence } from '../persistence/sqlite/getServerPersistence';
import { stopServerCommand } from '../commands/stopServerCommand';

type stopServerInteractorOptions = {
  serverId: String;
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
  await stopServerCommand({ node, server });
};
