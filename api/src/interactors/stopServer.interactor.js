module.exports = async ({ applicationContext, serverId }) =>
  applicationContext.persistence.stopServer({
    applicationContext,
    serverId,
  });
