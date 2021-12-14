import { Request, Response } from 'express';
import { getNodePersistence } from '../persistence/getNodePersistence';

export const getNodeRoute = async (req: Request, res: Response) => {
  const { nodeId } = req.params;
  const serverNode = await getNodePersistence({ nodeId });
  return res.send(serverNode);
};
