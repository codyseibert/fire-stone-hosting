import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';

export const loginRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const { email, password } = req.body;
  try {
    const token = await applicationContext.interactors.loginInteractor({
      applicationContext,
      email,
      password,
    });
    return res.send(token);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
