module.exports = async ({ applicationContext, serverId }) =>
  applicationContext.persistence.backupComplete({
    applicationContext,
    serverId,
  });
