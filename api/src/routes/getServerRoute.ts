import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';
import { getServerInteractor } from '../interactors/getServerInteractor';

export const getServerRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  const applicationContext = createApplicationContext();
  const server = await getServerInteractor({
    serverId,
    applicationContext,
  });
  return res.send(server);
};
