import { Request, Response } from 'express';
import { stopServerInteractor } from '../interactors/stopServerInteractor';

export const stopServerRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  await stopServerInteractor({
    serverId,
  });
  return res.send('server stopped');
};
