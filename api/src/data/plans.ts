export type Plan = {
  memory: number;
  plan: string;
  name: string;
};

export const plans: Plan[] = [
  {
    memory: 1 * 1024,
    plan: 'plan_FM8EuuGF3C3pn3',
    name: 'Wood',
  },
  {
    memory: 2 * 1024,
    plan: 'plan_FM8E73TqKTZIWV',
    name: 'Stone',
  },
  {
    memory: 3 * 1024,
    plan: 'plan_FM8EHhCrxNZGhd',
    name: 'Iron',
  },
  {
    memory: 4 * 1024,
    name: 'Gold',
    plan: 'plan_FM8EvzJrRIYn5R',
  },
  {
    memory: 5 * 1024,
    plan: 'plan_FM8ExZxKgKh22g',
    name: 'Diamond',
  },
  {
    memory: 6 * 1024,
    name: 'Netherite',
    plan: 'plan_FM8En4JVkWZ43y',
  },
];
