const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const applicationContext = applicationContextFactory();
  const { serverId } = req.params;
  await applicationContext.interactors.runBackupInteractor({
    applicationContext,
    serverId,
  });
  return res.send('server backing up');
};
