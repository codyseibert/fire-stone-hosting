const applicationContextFactory = require('../applicationContext');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { plan } = req.body;
  const applicationContext = applicationContextFactory();
  const user = jwt.decode(
    req.headers.authorization.split(' ')[1],
    process.env.JWT_SECRET || 'testing',
  );
  try {
    const ret = await applicationContext.interactors.purchaseServerInteractor({
      plan,
      user,
      applicationContext,
    });
    return res.send(ret);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
