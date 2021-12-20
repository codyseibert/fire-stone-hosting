import { createUserPersistence } from '../persistence/createUserPersistence';
import { v4 as uuidv4 } from 'uuid';

// const stripe = require('stripe')(process.env.STRIPE_KEY);

const costPerGB = 3;

export type Account = {
  email: string;
  password: string;
  passwordConfirm: String;
};

type registerInteractorOptions = {
  account: Account;
};

export const registerInteractor = async ({
  account,
}: registerInteractorOptions) => {
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

  await createUserPersistence({
    user: {
      ...account,
      // stripeCustomerId: customer.id,
      id: userId,
    },
  });
};
