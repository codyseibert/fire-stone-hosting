module.exports = async ({ applicationContext, serverId }) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `runBackup` = ? WHERE `id` = ?',
  );
  await statement.run(false, serverId);
  await statement.finalize();
};
