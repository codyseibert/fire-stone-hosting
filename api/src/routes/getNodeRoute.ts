import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';
import { getNodePersistence } from '../persistence/getNodePersistence';

export const getNodeRoute = async (req: Request, res: Response) => {
  const { nodeId } = req.params;
  const applicationContext = createApplicationContext();
  const serverNode = await getNodePersistence({ applicationContext, nodeId });
  return res.send(serverNode);
};
