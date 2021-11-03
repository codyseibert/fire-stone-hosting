import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const createNodeRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  await applicationContext.interactors.createNodeInteractor({
    applicationContext,
    node: req.body,
  });
  return res.send('node registered');
};
