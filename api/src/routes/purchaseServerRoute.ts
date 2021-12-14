import { plans } from '../data/plans';

import { Request, Response } from 'express';
import { purchaseServerInteractor } from '../interactors/purchaseServerInteractor';
export interface IAuthRequest extends Request {
  user: any;
}

export const purchaseServerRoute = async (req: IAuthRequest, res: Response) => {
  const { planId, version } = req.body;
  const plan = plans.find(p => p.plan === planId);
  try {
    const ret = await purchaseServerInteractor({
      plan,
      version,
      user: req.user,
    });
    return res.send(ret);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};
