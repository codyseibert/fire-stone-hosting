import { Request, Response } from 'express';
import { runBackupInteractor } from '../interactors/runBackupInteractor';

export const runBackupRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  await runBackupInteractor({
    serverId,
  });
  return res.send('server backing up');
};
