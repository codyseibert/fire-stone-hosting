import { startServerPersistence } from '../persistence/startServerPersistence';
import { getServerPersistence } from '../persistence/getServerPersistence';
import { getNodePersistence } from '../persistence/getNodePersistence';
import { startServerCommand } from '../commands/startServerCommand';

type startServerInteractorOptions = {
  serverId: string;
};

export const startServerInteractor = async ({
  serverId,
}: startServerInteractorOptions) => {
  const server = await getServerPersistence({ serverId });
  const node = await getNodePersistence({
    nodeId: server.nodeId,
  });
  startServerPersistence({
    serverId,
  });
  await startServerCommand({ serverId: server.id, node });
};
