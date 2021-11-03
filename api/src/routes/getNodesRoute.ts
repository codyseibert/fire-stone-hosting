import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const getNodesRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const nodes = await applicationContext.interactors.getNodesInteractor({
    applicationContext,
  });
  return res.send(nodes);
};
