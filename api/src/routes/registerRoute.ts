import { Request, Response } from 'express';
import { registerInteractor } from '../interactors/registerInteractor';

export const registerRoute = async (req: Request, res: Response) => {
  const account = req.body;
  try {
    await registerInteractor({
      account,
    });
    return res.send('account registered');
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
