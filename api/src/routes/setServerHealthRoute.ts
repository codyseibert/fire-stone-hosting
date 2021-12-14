import { Request, Response } from 'express';
import { setServerHealthInteractor } from '../interactors/setServerHealthInteractor';

export const setServerHealthRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  await setServerHealthInteractor({
    serverId,
    ...req.body,
  });
  return res.send('server health saved');
};
