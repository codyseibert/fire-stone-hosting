import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const runBackupRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const { serverId } = req.params;
  await applicationContext.interactors.runBackupInteractor({
    applicationContext,
    serverId,
  });
  return res.send('server backing up');
};
