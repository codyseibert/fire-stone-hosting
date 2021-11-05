import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';
import { createNodeInteractor } from '../interactors/createNodeInteractor';

export const createNodeRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  await createNodeInteractor({
    applicationContext,
    node: req.body,
  });
  return res.send('node registered');
};
