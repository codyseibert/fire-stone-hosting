module.exports = async ({
  applicationContext,
  serverId,
  cpuPercent,
  memoryPercent,
}) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `cpuPercent` = ?, `memoryPercent` = ? WHERE `id` = ?',
  );
  await statement.run(cpuPercent, memoryPercent, serverId);
  await statement.finalize();
};
