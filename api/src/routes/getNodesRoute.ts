import { Request, Response } from 'express';
import { getNodesInteractor } from '../interactors/getNodesInteractor';

export const getNodesRoute = async (req: Request, res: Response) => {
  const nodes = await getNodesInteractor();
  return res.send(nodes);
};
