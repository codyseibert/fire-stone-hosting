const jwt = require('jsonwebtoken');

module.exports = async ({ applicationContext, email }) => {
  await applicationContext.persistence.getUser({
    applicationContext,
    email,
  });
};
