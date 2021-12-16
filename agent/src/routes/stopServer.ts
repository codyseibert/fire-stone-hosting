import { Request, Response } from 'express';
import { stopServerCommand } from '../commands/stopServerCommand';

export const stopServer = async (req: Request, res: Response) => {
  const { serverId } = req.params;

  console.log('stopping', serverId);

  await stopServerCommand({ serverId });

  res.json({ message: 'server stopped' });
};
