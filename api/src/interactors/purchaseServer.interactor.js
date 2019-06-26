const uuidv4 = require('uuid/v4');

module.exports = async ({ applicationContext, userId, memory }) => {
  const nodes = await applicationContext.persistence.getNodes({
    applicationContext,
  });

  console.log('nodes', nodes);
  const desiredNode = nodes.find(node => node.free_memory > memory);

  if (!desiredNode) {
    throw new Error('no available nodes');
  }

  const servers = await applicationContext.persistence.getServersOnNode({
    applicationContext,
    nodeId: desiredNode.id,
  });

  let freePort = 25565;
  if (servers.length) {
    const ports = servers.map(s => s.port).sort();
    freePort = ports[ports.length - 1] + 1;
  }

  await applicationContext.persistence.setFreeMemoryOnNode({
    applicationContext,
    freeMemory: desiredNode.free_memory - memory,
    nodeId: desiredNode.id,
  });

  await applicationContext.persistence.createServer({
    applicationContext,
    server: {
      serverId: uuidv4(),
      nodeId: desiredNode.id,
      port: freePort,
      memory,
      userId,
    },
  });
};
