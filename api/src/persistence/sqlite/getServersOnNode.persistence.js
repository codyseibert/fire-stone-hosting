module.exports = async ({ applicationContext, nodeId }) => {
  return (await applicationContext.db).all(
    'SELECT * from `servers` WHERE `nodeId` = ?',
    [nodeId],
  );
};
