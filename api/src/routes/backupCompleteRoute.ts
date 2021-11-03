import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const backupCompleteRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const { serverId } = req.params;
  await applicationContext.interactors.backupCompleteInteractor({
    applicationContext,
    serverId,
  });
  return res.send('server back up complete');
};
