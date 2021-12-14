import { createServerPersistence } from '../persistence/createServerPersistence';
import { v4 as uuidv4 } from 'uuid';
import { Server } from '../models/Server';

// const stripe = require('stripe')(process.env.STRIPE_KEY);

import { User } from '../persistence/createUserPersistence';
import { getServersOnNodePersistence } from '../persistence/getServersOnNodePersistence';
import { getNodesPersistence } from '../persistence/getNodesPersistence';
import { plans } from '../data/plans';
import { setFreeMemoryOnNodePersistence } from '../persistence/setFreeMemoryOnNodePersistence';

type purchaseServerInteractorOptions = {
  user: User;
  version: string;
  plan: {
    plan: string;
  };
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

  const nodes = await getNodesPersistence();

  const memory = plans.find(p => p.plan === plan.plan)!.memory;
  const desiredNode = nodes.find(node => true || node.freeMemory > memory); // TODO: remove true

  if (!desiredNode) {
    throw new Error('no available nodes');
  }

  const servers: Server[] = await getServersOnNodePersistence({
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

  const server: Server = {
    id: uuidv4(),
    nodeId: desiredNode.id,
    port: freePort,
    memory,
    version,
    userId: user.id,
    running: true,
    runBackup: false,
    restart: false,
  };

  await createServerPersistence({
    server,
  });

  return server;
};
