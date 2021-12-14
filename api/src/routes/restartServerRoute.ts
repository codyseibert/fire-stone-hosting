import { Request, Response } from 'express';
import { restartServerInteractor } from '../interactors/restartServerInteractor';

export const restartServerRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  await restartServerInteractor({
    serverId,
  });
  return res.send('server restarting');
};
