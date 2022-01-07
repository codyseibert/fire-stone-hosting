import { Request, Response } from 'express';
import { restartServerCommand } from '../commands/restartServerCommand';
import { getServerConfig } from '../interactors/getServerConfig';
import { updateServerConfig } from '../interactors/updateServerConfig';

export const switchToWorldRoute = async (req: Request, res: Response) => {
  const { serverId, worldName } = req.params;
  const configuration = await getServerConfig(serverId);
  configuration['level-name'] = worldName;
  await updateServerConfig(configuration, serverId);
  await restartServerCommand({ serverId });
  res.json({ message: 'ok', worldName });
};
