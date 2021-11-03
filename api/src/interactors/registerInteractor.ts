
import { v4 as uuidv4 } from 'uuid';

import * as stripeFn from 'stripe';

const strip = stripeFn(process.env.STRIPE_KEY);

const costPerGB = 3;

import { ApplicationContext } from "../createApplicationContext";

type Account = {
  email: String;
  password: String;
  passwordConfirm: String;
}

type registerInteractorOptions = {
  account: Account;
  applicationContext: ApplicationContext;
};

export const registerInteractor = async ({ applicationContext, account }: registerInteractorOptions) => {
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
