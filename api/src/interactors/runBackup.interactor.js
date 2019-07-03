module.exports = async ({ applicationContext, serverId }) =>
  applicationContext.persistence.runBackup({
    applicationContext,
    serverId,
  });
