import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const getServerRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  const applicationContext = createApplicationContext();
  const server = await applicationContext.interactors.getServerInteractor({
    serverId,
    applicationContext,
  });
  return res.send(server);
};
