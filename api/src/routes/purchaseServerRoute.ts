import { createApplicationContext } from '../createApplicationContext';
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

export const purchaseServerRoute = async (req: Request, res: Response) => {
  const { plan } = req.body;
  const applicationContext = createApplicationContext();
  const user = jwt.decode(
    req.headers.authorization.split(' ')[1],
    process.env.JWT_SECRET || 'testing',
  );
  try {
    const ret = await applicationContext.interactors.purchaseServerInteractor({
      plan,
      user,
      applicationContext,
    });
    return res.send(ret);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
