import { Request, Response } from 'express';
import { getServersForUserInteractor } from '../interactors/getServersForUserInteractor';

export const getServersForUserRoute = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const servers = await getServersForUserInteractor({
    userId,
  });
  return res.send(servers);
};
