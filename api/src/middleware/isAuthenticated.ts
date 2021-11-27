import { NextFunction, Response } from 'express';
import { IAuthRequest } from '../routes/purchaseServerRoute';

const jwt = require('jsonwebtoken');

export const isAuthenticated = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWT_SECRET || 'testing',
    );
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send('Unauthenticated');
  }
};
