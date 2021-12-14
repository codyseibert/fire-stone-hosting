import { stopServerPersistence } from '../persistence/stopServerPersistence';
import { getNodePersistence } from '../persistence/getNodePersistence';
import { getServerPersistence } from '../persistence/getServerPersistence';
import { stopServerCommand } from '../commands/stopServerCommand';

type stopServerInteractorOptions = {
  serverId: string;
};

export const stopServerInteractor = async ({
  serverId,
}: stopServerInteractorOptions) => {
  const server = await getServerPersistence({ serverId });
  const node = await getNodePersistence({
    nodeId: server.nodeId,
  });
  await stopServerPersistence({
    serverId,
  });
  await stopServerCommand({ node, serverId: server.id });
};
