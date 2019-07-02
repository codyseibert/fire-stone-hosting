const uuidv4 = require('uuid/v4');

const stripe = require('stripe')(process.env.STRIPE_KEY);

const costPerGB = 3;

module.exports = async ({ applicationContext, account }) => {
  if (!account.email) {
    throw new Error('You must provide an email.');
  }
  if (!account.password) {
    throw new Error('You must provide a password');
  }
  if (account.password !== account.passwordConfirm) {
    throw new Error('Your password must match the verify password.');
  }

  const userId = uuidv4();

  await applicationContext.persistence.createUser({
    applicationContext,
    user: {
      ...account,
      stripeCustomerId: customer.id,
      id: userId,
    },
  });
};
