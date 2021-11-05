
import { createServerPersistence } from '../persistence/sqlite/createServerPersistence';
import { v4 as uuidv4 } from 'uuid';

// const stripe = require('stripe')(process.env.STRIPE_KEY);

import { ApplicationContext } from "../createApplicationContext";
import { User } from '../persistence/sqlite/createUserPersistence';
import { getServersOnNodePersistence } from '../persistence/sqlite/getServersOnNodePersistence';

type purchaseServerInteractorOptions = {
  user: User;
  plan: {
    plan: string;
  };
  applicationContext: ApplicationContext;
};

// const costPerGB = 3;

export const purchaseServerInteractor = async ({ applicationContext, user, plan }: purchaseServerInteractorOptions) => {
  const planMemory: {
    [key: string]: number
  } = {
    plan_FM8EuuGF3C3pn3: 0.5 * 1024 * 1024 * 1024,
    plan_FM8E73TqKTZIWV: 1 * 1024 * 1024 * 1024,
    plan_FM8EHhCrxNZGhd: 2 * 1024 * 1024 * 1024,
    plan_FM8EvzJrRIYn5R: 4 * 1024 * 1024 * 1024,
    plan_FM8ExZxKgKh22g: 6 * 1024 * 1024 * 1024,
    plan_FM8En4JVkWZ43y: 8 * 1024 * 1024 * 1024,
  };

  // await stripe.subscriptions.create({
  //   customer: user.id,
  //   items: [
  //     {
  //       plan: plan.plan,
  //       quantity: 1,
  //     },
  //   ],
  // });

  const nodes = await applicationContext.persistence.getNodes({
    applicationContext,
  });

  const memory = planMemory[plan.plan];
  const desiredNode = nodes.find(node => true || node.freeMemory > memory); // TODO: remove true

  if (!desiredNode) {
    throw new Error('no available nodes');
  }

  const servers = await getServersOnNodePersistence({
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

  const server = {
    id: uuidv4(),
    nodeId: desiredNode.id,
    port: freePort,
    memory,
    userId: user.id,
  };

  await createServerPersistence({
    applicationContext,
    server,
  });

  return server;
};
