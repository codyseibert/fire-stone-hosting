import { Request, Response } from 'express';
import { createAccountAndPurchaseServerInteractor } from '../interactors/createAccountAndPurchaseServerInteractor';

export const createAccountAndPurchaseServerRoute = async (
  req: Request,
  res: Response,
) => {
  const { version, email, password, passwordConfirm, planId } = req.body;

  // TODO: create source with stripe using provided card info
  const source = 'abc';

  try {
    const ret = await createAccountAndPurchaseServerInteractor({
      planId,
      password,
      passwordConfirm,
      email,
      version,
      source,
    });
    return res.send(ret);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
