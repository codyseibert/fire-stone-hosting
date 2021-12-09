import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';
import { ServerNode } from 'src/persistence/sqlite/getNodesPersistence';

export const getNodeRoute = async (req: Request, res: Response) => {
  const { nodeId } = req.params;
  const applicationContext = createApplicationContext();
  const serverNodes: ServerNode[] = await (await applicationContext.db).all('SELECT * from `nodes` where id = ?', [nodeId])
  return res.send(serverNodes[0]);
};
