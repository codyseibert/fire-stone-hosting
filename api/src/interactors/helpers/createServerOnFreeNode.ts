import { getNodesPersistence } from '../../persistence/getNodesPersistence';
import { getServersOnNodePersistence } from '../../persistence/getServersOnNodePersistence';
import { setFreeMemoryOnNodePersistence } from '../../persistence/setFreeMemoryOnNodePersistence';
import { createServerPersistence } from '../../persistence/createServerPersistence';
import { v4 as uuidv4 } from 'uuid';
import { Plan } from '../../data/plans';
import { startServerCommand } from '../../commands/startServerCommand';

export const createServerOnFreeNode = async ({
  userId,
  version,
  plan,
}: {
  userId: string;
  version: string;
  plan: Plan;
}) => {
  const nodes = await getNodesPersistence();

  const memory = plan.memory;
  const desiredNode = nodes.find(node => true || node.freeMemory > memory); // TODO: remove true

  if (!desiredNode) {
    throw new Error('no available nodes');
  }

  const servers = await getServersOnNodePersistence({
    nodeId: desiredNode.id,
  });

  let freePort = 25565;
  if (servers.length) {
    const ports = servers.map(s => s.port).sort();
    freePort = ports[ports.length - 1] + 1;
  }

  await setFreeMemoryOnNodePersistence({
    freeMemory: desiredNode.freeMemory - memory,
    nodeId: desiredNode.id,
  });
  const server = {
    id: uuidv4(),
    nodeId: desiredNode.id,
    port: freePort,
    version,
    running: true,
    runBackup: false,
    restart: false,
    memory,
    userId,
  };

  await createServerPersistence({
    server,
  });

  await startServerCommand({
    serverId: server.id,
    node: desiredNode 
  })

  return server;
};
