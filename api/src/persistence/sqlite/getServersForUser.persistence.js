module.exports = async ({ applicationContext, userId }) =>
  (await applicationContext.db).all(
    'SELECT s.id, n.id as nodeId, s.memory, s.running, s.port, n.ip from `servers` as s JOIN `nodes` as n ON s.`nodeId` = n.`id` WHERE `userId` = ?',
    [userId],
  );
