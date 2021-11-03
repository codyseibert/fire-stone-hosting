import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const getServersForUserRoute = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const applicationContext = createApplicationContext();
  const servers = await applicationContext.interactors.getServersForUserInteractor(
    {
      userId,
      applicationContext,
    },
  );
  return res.send(servers);
};
