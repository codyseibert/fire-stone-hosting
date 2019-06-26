module.exports = async ({ applicationContext, userId }) =>
  (await applicationContext.db).all(
    'SELECT * from `servers` JOIN `nodes` ON `servers`.`nodeId` = `nodes`.`id` WHERE `userId` = ?',
    [userId],
  );
