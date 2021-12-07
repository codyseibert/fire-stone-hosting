import { createApplicationContext } from '../createApplicationContext';
import { Request, Response } from 'express';
import { loginInteractor } from '../interactors/loginInteractor';

export const loginRoute = async (req: Request, res: Response) => {
  const applicationContext = createApplicationContext();
  const { email, password } = req.body;
  try {
    const credentials = await loginInteractor({
      applicationContext,
      email,
      password,
    });
    return res.send(credentials);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
