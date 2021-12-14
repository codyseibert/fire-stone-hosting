import { Request, Response } from 'express';
import { getServersOnNodeInteractor } from '../interactors/getServersOnNodeInteractor';

export const getServersOnNodeRoute = async (req: Request, res: Response) => {
  const { nodeId } = req.params;
  const servers = await getServersOnNodeInteractor({
    nodeId,
  });
  return res.send(servers);
};
