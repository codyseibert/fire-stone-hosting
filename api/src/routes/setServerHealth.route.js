const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const applicationContext = applicationContextFactory();
  const { serverId } = req.params;
  await applicationContext.interactors.setServerHealthInteractor({
    applicationContext,
    serverId,
    ...req.body,
  });
  return res.send('server health saved');
};
