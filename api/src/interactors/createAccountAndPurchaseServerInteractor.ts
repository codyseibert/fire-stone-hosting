import { v4 as uuidv4 } from 'uuid';

// const stripe = require('stripe')(process.env.STRIPE_KEY);

import { plans } from '../data/plans';
import { getServersOnNodePersistence } from '../persistence/getServersOnNodePersistence';
import { createUserPersistence } from '../persistence/createUserPersistence';
import { createServerPersistence } from '../persistence/createServerPersistence';
import { getNodesPersistence } from '../persistence/getNodesPersistence';
import { setFreeMemoryOnNodePersistence } from '../persistence/setFreeMemoryOnNodePersistence';
import { getSignedToken } from '../lib/jwt';

type createAccountAndPurchaseServerInteractorOptions = {
  email: string;
  password: string;
  passwordConfirm: string;
  planId: string;
  source: string;
};

export const createAccountAndPurchaseServerInteractor = async ({
  email,
  password,
  passwordConfirm,
  planId,
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

  const nodes = await getNodesPersistence();

  const memory = plan.memory;
  const desiredNode = nodes.find(node => true || node.freeMemory > memory); // TODO: remove true

  if (!desiredNode) {
    throw new Error('no available nodes');
  }

  const servers = await getServersOnNodePersistence({
    nodeId: desiredNode.id,
  });

  let freePort = 25565;
  if (servers.length) {
    const ports = servers.map(s => s.port).sort();
    freePort = ports[ports.length - 1] + 1;
  }

  await setFreeMemoryOnNodePersistence({
    freeMemory: desiredNode.freeMemory - memory,
    nodeId: desiredNode.id,
  });

  await createServerPersistence({
    server: {
      id: uuidv4(),
      nodeId: desiredNode.id,
      port: freePort,
      version: '1.18.1',
      running: true,
      runBackup: false,
      restart: false,
      memory,
      userId,
    },
  });

  return { token, user };
};
