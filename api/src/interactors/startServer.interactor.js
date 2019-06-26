module.exports = async ({ applicationContext, serverId }) =>
  applicationContext.persistence.startServer({
    applicationContext,
    serverId,
  });
