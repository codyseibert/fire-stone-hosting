import { Request, Response } from 'express';
import { updateServerConfig } from '../interactors/updateServerConfig';

export const updateServerConfiguration = async (
  req: Request,
  res: Response,
) => {
  const { serverId } = req.params;

  try {
    const updateStatus = await updateServerConfig(req.body, serverId);

    if (updateStatus) {
      res.send('success');
    } else {
      res.status(400).send('failure');
    }
  } catch (err) {
    res.status(500).send('server error');
  }
};
