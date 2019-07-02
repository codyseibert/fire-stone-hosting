const jwt = require('jsonwebtoken');

module.exports = async ({ applicationContext, email, password }) => {
  const user = await applicationContext.persistence.getUser({
    applicationContext,
    email,
  });
  if (!user) {
    throw new Error('invalid login');
  }

  if (user.password !== password) {
    throw new Error('invalid login');
  }

  const token = jwt.sign(user, process.env.JWT_SECRET || 'testing');
  return { token, user };
};
