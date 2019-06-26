const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const applicationContext = applicationContextFactory();
  await applicationContext.interactors.createNodeInteractor({
    applicationContext,
    node: req.body,
  });
  return res.send('node registered');
};
