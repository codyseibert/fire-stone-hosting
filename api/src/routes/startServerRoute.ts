import { Request, Response } from 'express';
import { startServerInteractor } from '../interactors/startServerInteractor';

export const startServerRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  await startServerInteractor({
    serverId,
  });
  return res.send('server started');
};
