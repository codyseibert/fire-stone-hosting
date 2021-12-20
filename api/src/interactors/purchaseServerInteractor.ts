import { createServerPersistence } from '../persistence/createServerPersistence';
import { v4 as uuidv4 } from 'uuid';
import { Server } from '../models/Server';

// const stripe = require('stripe')(process.env.STRIPE_KEY);

import { User } from '../persistence/createUserPersistence';
import { getServersOnNodePersistence } from '../persistence/getServersOnNodePersistence';
import { getNodesPersistence } from '../persistence/getNodesPersistence';
import { Plan, plans } from '../data/plans';
import { setFreeMemoryOnNodePersistence } from '../persistence/setFreeMemoryOnNodePersistence';
import { createServerOnFreeNode } from './helpers/createServerOnFreeNode';

type purchaseServerInteractorOptions = {
  user: User;
  version: string;
  plan: Plan;
};

export const purchaseServerInteractor = async ({
  user,
  plan,
  version,
}: purchaseServerInteractorOptions) => {
  // await stripe.subscriptions.create({
  //   customer: user.id,
  //   items: [
  //     {
  //       plan: plan.plan,
  //       quantity: 1,
  //     },
  //   ],
  // });

  const server = await createServerOnFreeNode({
    userId: user.id,
    plan,
    version,
  });

  return server;
};
