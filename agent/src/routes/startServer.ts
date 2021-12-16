import { Request, Response } from 'express';
import { startServerCommand } from '../commands/startServerCommand';

export const startServer = async (req: Request, res: Response) => {
  const { serverId } = req.params;

  console.log('starting', serverId);

  await startServerCommand({ serverId });

  res.json({ message: 'server started' });
};
