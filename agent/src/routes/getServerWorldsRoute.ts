import { Request, Response } from 'express';
import { getServerConfig } from '../interactors/getServerConfig';
import { getServerWorlds } from '../interactors/getServerWorlds';

export const getServerWorldsRoute = async (req: Request, res: Response) => {
  const { serverId } = req.params;
  const worlds = await getServerWorlds(serverId);
  res.json(worlds);
};
