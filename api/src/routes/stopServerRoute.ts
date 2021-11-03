import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const stopServerRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const { serverId } = req.params;
  await applicationContext.interactors.stopServerInteractor({
    applicationContext,
    serverId,
  });
  return res.send('server stopped');
};
