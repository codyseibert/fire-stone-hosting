const applicationContextFactory = require('../applicationContext');

module.exports = async (req, res) => {
  const applicationContext = applicationContextFactory();
  const { email, password } = req.body;
  try {
    const token = await applicationContext.interactors.loginInteractor({
      applicationContext,
      email,
      password,
    });
    return res.send(token);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
