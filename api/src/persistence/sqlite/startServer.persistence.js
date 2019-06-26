module.exports = async ({ applicationContext, serverId }) => {
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `running` = ? WHERE `id` = ?',
  );
  await statement.run(true, serverId);
  await statement.finalize();
};
