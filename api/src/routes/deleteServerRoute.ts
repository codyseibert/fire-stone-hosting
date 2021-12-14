import { Request, Response } from 'express';
import { deleteServerInteractor } from '../interactors/deleteServerInteractor';

export const deleteServerRoute = async (req: Request, res: Response) => {
  await deleteServerInteractor({
    serverId: req.params.serverId,
  });
  return res.send('node registered');
};
