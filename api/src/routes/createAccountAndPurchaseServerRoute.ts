import { Request, Response } from 'express';
import { createAccountAndPurchaseServerInteractor } from '../interactors/createAccountAndPurchaseServerInteractor';

export const createAccountAndPurchaseServerRoute = async (
  req: Request,
  res: Response,
) => {
  const { email, password, passwordConfirm, planId, source } = req.body;
  try {
    const ret = await createAccountAndPurchaseServerInteractor({
      planId,
      password,
      passwordConfirm,
      email,
      source,
    });
    return res.send(ret);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
