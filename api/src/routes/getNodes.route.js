const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const applicationContext = applicationContextFactory();
  const nodes = await applicationContext.interactors.getNodesInteractor({
    applicationContext,
  });
  return res.send(nodes);
};
