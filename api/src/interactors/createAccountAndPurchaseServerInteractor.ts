// const stripe = require('stripe')(process.env.STRIPE_KEY);
import { v4 as uuidv4 } from 'uuid';

import { plans } from '../data/plans';
import { createUserPersistence } from '../persistence/createUserPersistence';
import { getSignedToken } from '../lib/jwt';
import { createServerOnFreeNode } from './helpers/createServerOnFreeNode';

type createAccountAndPurchaseServerInteractorOptions = {
  email: string;
  password: string;
  passwordConfirm: string;
  planId: string;
  version: string;
  source: string;
};

export const createAccountAndPurchaseServerInteractor = async ({
  email,
  password,
  passwordConfirm,
  planId,
  version,
  source,
}: createAccountAndPurchaseServerInteractorOptions) => {
  let customer;

  if (!email) {
    throw new Error('You must provide an email.');
  }
  if (!password) {
    throw new Error('You must provide a password');
  }
  if (password !== passwordConfirm) {
    throw new Error('Your password must match the verify password.');
  }

  const userId = uuidv4();

  const user = {
    id: userId,
    email,
    password,
  };

  await createUserPersistence({
    user,
  });

  const token = getSignedToken(user);

  // customer = await stripe.customers.create({
  //   email: user.email,
  //   id: userId,
  //   source,
  // });

  const plan = plans.find(p => p.plan === planId)!;

  // await stripe.subscriptions.create({
  //   customer: customer.id,
  //   items: [
  //     {
  //       plan: plan.plan,
  //       quantity: 1,
  //     },
  //   ],
  // });
  await createServerOnFreeNode({
    userId,
    plan,
    version,
  });

  return { token, user };
};
