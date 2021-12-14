import { Request, Response } from 'express';
import { backupCompleteInteractor } from '../interactors/backupCompleteInteractor';

export const backupCompleteRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  await backupCompleteInteractor({
    serverId,
  });
  return res.send('server back up complete');
};
