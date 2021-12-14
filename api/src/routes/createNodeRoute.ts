import { Request, Response } from 'express';
import { createNodeInteractor } from '../interactors/createNodeInteractor';

export const createNodeRoute = async (req: Request, res: Response) => {
  await createNodeInteractor({
    node: req.body,
  });
  return res.send('node registered');
};
