import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const setServerHealthRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const { serverId } = req.params;
  await applicationContext.interactors.setServerHealthInteractor({
    applicationContext,
    serverId,
    ...req.body,
  });
  return res.send('server health saved');
};
