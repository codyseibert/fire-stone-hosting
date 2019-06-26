const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const applicationContext = applicationContextFactory();
  const { serverId } = req.params;
  await applicationContext.interactors.startServerInteractor({
    applicationContext,
    serverId,
  });
  return res.send('server started');
};
