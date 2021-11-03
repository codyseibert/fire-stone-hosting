module.exports = async ({ serverId, applicationContext }) =>
  applicationContext.persistence.getServer({
    serverId,
    applicationContext,
  });
