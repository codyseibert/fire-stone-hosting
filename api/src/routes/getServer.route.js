const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const { serverId } = req.params;
  const applicationContext = applicationContextFactory();
  const server = await applicationContext.interactors.getServerInteractor({
    serverId,
    applicationContext,
  });
  return res.send(server);
};
