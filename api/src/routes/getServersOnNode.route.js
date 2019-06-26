const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const { nodeId } = req.params;
  const applicationContext = applicationContextFactory();
  const servers = await applicationContext.interactors.getServersOnNodeInteractor(
    {
      nodeId,
      applicationContext,
    },
  );
  return res.send(servers);
};
