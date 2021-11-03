import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const startServerRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const { serverId } = req.params;
  await applicationContext.interactors.startServerInteractor({
    applicationContext,
    serverId,
  });
  return res.send('server started');
};
