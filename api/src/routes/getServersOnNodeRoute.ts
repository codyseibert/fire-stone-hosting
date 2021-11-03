import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const getServersOnNodeRoute = async (req: Request, res: Response) => {
  const { nodeId } = req.params;
  const applicationContext = createApplicationContext();
  const servers = await applicationContext.interactors.getServersOnNodeInteractor(
    {
      nodeId,
      applicationContext,
    },
  );
  return res.send(servers);
};
