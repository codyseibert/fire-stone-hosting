import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const restartServerDoneRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();

  await applicationContext.db.servers.update({
    where: {
      id: req.params.serverId,
    },
    data: {
      restart: false,
    },
  });

  return res.send('server done restarting');
};
