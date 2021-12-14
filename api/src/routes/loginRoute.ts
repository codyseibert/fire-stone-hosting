import { Request, Response } from 'express';
import { loginInteractor } from '../interactors/loginInteractor';

export const loginRoute = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const credentials = await loginInteractor({
      email,
      password,
    });
    return res.send(credentials);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
