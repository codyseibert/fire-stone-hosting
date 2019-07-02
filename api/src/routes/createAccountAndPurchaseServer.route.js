const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const { plan, user, source } = req.body;
  const applicationContext = applicationContextFactory();
  try {
    const ret = await applicationContext.interactors.createAccountAndPurchaseServerInteractor(
      {
        plan,
        user,
        source,
        applicationContext,
      },
    );
    return res.send(ret);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
