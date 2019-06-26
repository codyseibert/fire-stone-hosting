const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const userId = 'abc';
  const { memory } = req.body;
  const applicationContext = applicationContextFactory();

  try {
    await applicationContext.interactors.purchaseServerInteractor({
      memory,
      userId,
      applicationContext,
    });
    return res.send('server purchased and starting up now');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
