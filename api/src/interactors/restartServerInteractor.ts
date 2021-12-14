import { getServerPersistence } from '../persistence/getServerPersistence';
import { getNodePersistence } from '../persistence/getNodePersistence';
import { restartServerCommand } from '../commands/restartServerCommand';
import { startServerPersistence } from '../persistence/startServerPersistence';

type restartServerInteractorOptions = {
  serverId: string;
};

export const restartServerInteractor = async ({
  serverId,
}: restartServerInteractorOptions) => {
  const server = await getServerPersistence({ serverId });
  const node = await getNodePersistence({
    nodeId: server.nodeId,
  });

  await startServerPersistence({ serverId: server.id });
  await restartServerCommand({ serverId: server.id, node });
};
