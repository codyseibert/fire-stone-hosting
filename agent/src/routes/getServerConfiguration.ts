import { Request, Response } from 'express';
import { getServerConfig } from '../interactors/getServerConfig';

export const getServerConfiguration = async (req: Request, res: Response) => {
  const { serverId } = req.params;

  const configuration = await getServerConfig(serverId);

  res.send(configuration);
};
