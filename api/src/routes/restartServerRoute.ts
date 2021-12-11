import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';
import { restartServerInteractor } from '../interactors/restartServerInteractor';

export const restartServerRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  const applicationContext = createApplicationContext();
  await restartServerInteractor({
    applicationContext,
    serverId,
  });
  return res.send('server restarting');
};
