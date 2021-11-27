import { createServerPersistence } from '../persistence/sqlite/createServerPersistence';
import { v4 as uuidv4 } from 'uuid';
import { Server } from '../models/Server';

// const stripe = require('stripe')(process.env.STRIPE_KEY);

import { ApplicationContext } from '../createApplicationContext';
import { User } from '../persistence/sqlite/createUserPersistence';
import { getServersOnNodePersistence } from '../persistence/sqlite/getServersOnNodePersistence';
import { getNodesPersistence } from '../persistence/sqlite/getNodesPersistence';
import { plans } from '../data/plans';

type purchaseServerInteractorOptions = {
  user: User;
  plan: {
    plan: string;
  };
  applicationContext: ApplicationContext;
};

export const purchaseServerInteractor = async ({
  user,
  plan,
  applicationContext,
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

  const nodes = await getNodesPersistence({
    applicationContext,
  });

  const memory = plans.find(p => p.plan === plan.plan).memory * 1024;
  const desiredNode = nodes.find(node => true || node.freeMemory > memory); // TODO: remove true

  if (!desiredNode) {
    throw new Error('no available nodes');
  }

  const servers: Server[] = await getServersOnNodePersistence({
    applicationContext,
    nodeId: desiredNode.id,
  });

  let freePort = 25565;
  if (servers.length) {
    const ports = servers.map(s => s.port).sort();
    freePort = ports[ports.length - 1] + 1;
  }

  await applicationContext.persistence.setFreeMemoryOnNode({
    applicationContext,
    freeMemory: desiredNode.freeMemory - memory,
    nodeId: desiredNode.id,
  });

  const server: Server = {
    id: uuidv4(),
    nodeId: desiredNode.id,
    port: freePort,
    memory,
    userId: user.id,
    running: true,
    runBackup: false,
  };
  console.log('creating server', server);

  await createServerPersistence({
    applicationContext,
    server,
  });

  return server;
};
