const uuidv4 = require('uuid/v4');

module.exports = async ({ applicationContext, account }) => {
  if (!account.email) {
    throw new Error('You must provide an email.');
  }
  if (!account.password) {
    throw new Error('You must provide a password');
  }
  if (account.password !== account.passwordVerify) {
    throw new Error('Your password must match the verify password.');
  }

  await applicationContext.persistence.createUser({
    applicationContext,
    user: {
      ...account,
      id: uuidv4(),
    },
  });
};
