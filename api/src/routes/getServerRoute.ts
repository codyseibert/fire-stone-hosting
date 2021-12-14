import { Request, Response } from 'express';
import { getServerInteractor } from '../interactors/getServerInteractor';

export const getServerRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  const server = await getServerInteractor({
    serverId,
  });
  return res.send(server);
};
