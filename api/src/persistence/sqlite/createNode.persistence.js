module.exports = async ({ applicationContext, node }) => {
  const { nodeId, ip, totalMemory, freeMemory } = node;
  const statement = await (await applicationContext.db).prepare(
    'REPLACE INTO `nodes` (`id`, `ip`, `total_memory`, `free_memory`) VALUES (?, ?, ?, ?)',
  );
  await statement.run(nodeId, ip, totalMemory, freeMemory);
  await statement.finalize();
};
