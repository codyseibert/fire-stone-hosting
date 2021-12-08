import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const restartServerDoneRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const statement = await (await applicationContext.db).prepare(
    'UPDATE `servers` SET `restart` = ? WHERE `id` = ?',
  );
  await statement.run(false, req.params.serverId);
  await statement.finalize();
  return res.send('server done restarting');
};

