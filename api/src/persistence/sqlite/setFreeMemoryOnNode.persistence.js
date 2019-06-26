module.exports = async ({ applicationContext, freeMemory, nodeId }) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `nodes` SET `free_memory` = ? WHERE `id` = ?',
  );
  await statement.run(freeMemory, nodeId);
  await statement.finalize();
};
