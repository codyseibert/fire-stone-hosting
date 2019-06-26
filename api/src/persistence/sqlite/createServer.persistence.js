module.exports = async ({ applicationContext, server }) => {
  const { serverId, nodeId, port, memory, userId } = server;
  const statement = await (await applicationContext.db).prepare(
    'INSERT INTO `servers` (`id`, `nodeId`, `port`, `memory`, `running`, `userId`) VALUES (?, ?, ?, ?, ?, ?)',
  );
  await statement.run(serverId, nodeId, port, memory, true, userId);
  await statement.finalize();
};
