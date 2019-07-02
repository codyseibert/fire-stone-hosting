const stripe = require('stripe')(process.env.STRIPE_KEY);

(async function() {
  const product = await stripe.products.create({
    id: 'prod_FM8E0BTiEveKlk',
    name: 'Minecraft Server',
    type: 'service',
  });

  await stripe.plans.create({
    id: 'plan_FM8EuuGF3C3pn3',
    amount: 150,
    interval: 'month',
    nickname: 'Sappling 0.5 GB',
    product: product.id,
    currency: 'usd',
  });

  await stripe.plans.create({
    id: 'plan_FM8E73TqKTZIWV',
    amount: 300,
    interval: 'month',
    nickname: 'Wood 1 GB',
    product: product.id,
    currency: 'usd',
  });

  await stripe.plans.create({
    id: 'plan_FM8EHhCrxNZGhd',
    amount: 600,
    interval: 'month',
    nickname: 'Stone 2 GB',
    product: product.id,
    currency: 'usd',
  });

  await stripe.plans.create({
    id: 'plan_FM8EvzJrRIYn5R',
    amount: 1200,
    interval: 'month',
    nickname: 'Iron 4 GB',
    product: product.id,
    currency: 'usd',
  });

  await stripe.plans.create({
    id: 'plan_FM8ExZxKgKh22g',
    amount: 1800,
    interval: 'month',
    nickname: 'Gold 6 GB',
    product: product.id,
    currency: 'usd',
  });

  await stripe.plans.create({
    id: 'plan_FM8En4JVkWZ43y',
    amount: 2400,
    interval: 'month',
    nickname: 'Gold 8 GB',
    product: product.id,
    currency: 'usd',
  });
})();
