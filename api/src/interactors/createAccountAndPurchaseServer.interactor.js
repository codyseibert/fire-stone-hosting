const jwt = require('jsonwebtoken');

const uuidv4 = require('uuid/v4');

const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = async ({ applicationContext, user, plan, source }) => {
  let customer;

  if (!user.email) {
    throw new Error('You must provide an email.');
  }
  if (!user.password) {
    throw new Error('You must provide a password');
  }
  if (user.password !== user.passwordConfirm) {
    throw new Error('Your password must match the verify password.');
  }

  const userId = uuidv4();

  user.id = userId;

  await applicationContext.persistence.createUser({
    applicationContext,
    user,
  });
  const token = jwt.sign(user, process.env.JWT_SECRET || 'testing');

  customer = await stripe.customers.create({
    email: user.email,
    id: userId,
    source,
  });

  const planMemory = {
    plan_FM8EuuGF3C3pn3: 0.5 * 1024 * 1024 * 1024,
    plan_FM8E73TqKTZIWV: 1 * 1024 * 1024 * 1024,
    plan_FM8EHhCrxNZGhd: 2 * 1024 * 1024 * 1024,
    plan_FM8EvzJrRIYn5R: 4 * 1024 * 1024 * 1024,
    plan_FM8ExZxKgKh22g: 6 * 1024 * 1024 * 1024,
    plan_FM8En4JVkWZ43y: 8 * 1024 * 1024 * 1024,
  };

  await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        plan: plan.plan,
        quantity: 1,
      },
    ],
  });

  const nodes = await applicationContext.persistence.getNodes({
    applicationContext,
  });

  const memory = planMemory[plan.plan];
  const desiredNode = nodes.find(node => true || node.free_memory > memory); // TODO: remove true

  if (!desiredNode) {
    throw new Error('no available nodes');
  }

  const servers = await applicationContext.persistence.getServersOnNode({
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
    freeMemory: desiredNode.free_memory - memory,
    nodeId: desiredNode.id,
  });

  await applicationContext.persistence.createServer({
    applicationContext,
    server: {
      serverId: uuidv4(),
      nodeId: desiredNode.id,
      port: freePort,
      memory,
      userId,
    },
  });

  return { token, user };
};
