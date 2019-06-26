const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const { userId } = req.params;
  const applicationContext = applicationContextFactory();
  const servers = await applicationContext.interactors.getServersForUser({
    userId,
    applicationContext,
  });
  return res.send(servers);
};
