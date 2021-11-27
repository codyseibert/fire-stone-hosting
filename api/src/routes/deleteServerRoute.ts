import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';
import { deleteServerInteractor } from '../interactors/deleteServerInteractor';

export const deleteServerRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  await deleteServerInteractor({
    applicationContext,
    serverId: req.params.serverId,
  });
  return res.send('node registered');
};
