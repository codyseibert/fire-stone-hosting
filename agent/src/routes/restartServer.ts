import { Request, Response } from 'express';
import { restartServerCommand } from '../commands/restartServerCommand';

export const restartServer = async (req: Request, res: Response) => {
  const { serverId } = req.params;

  console.log('restarting', serverId);

  await restartServerCommand({ serverId });

  res.json({ message: 'server restarting' });
};
