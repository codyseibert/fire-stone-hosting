const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const applicationContext = applicationContextFactory();
  const account = req.body;
  try {
    await applicationContext.interactors.registerInteractor({
      applicationContext,
      account,
    });
    return res.send('account registered');
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
