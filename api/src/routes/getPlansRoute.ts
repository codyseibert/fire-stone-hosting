import { Request, Response } from 'express';
import { plans } from '../data/plans';

export const getPlansRoute = (req: Request, res: Response) => {
  res.json(plans);
};
