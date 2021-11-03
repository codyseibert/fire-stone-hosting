import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const createAccountAndPurchaseServerRoute = async (req: Request, res: Response) => {
  const { plan, user, source } = req.body;
  const applicationContext = createApplicationContext();
  try {
    const ret = await applicationContext.interactors.createAccountAndPurchaseServerInteractor(
      {
        plan,
        user,
        source,
        applicationContext,
      },
    );
    return res.send(ret);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
