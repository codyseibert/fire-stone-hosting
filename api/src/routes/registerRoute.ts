import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const registerRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const account = req.body;
  try {
    await applicationContext.interactors.registerInteractor({
      applicationContext,
      account,
    });
    return res.send('account registered');
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
