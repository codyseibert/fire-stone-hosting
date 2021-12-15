import { NextFunction, Response } from 'express';
import { getTokenFromHeader, getTokenPayload } from '../lib/jwt';
import { IAuthRequest } from '../routes/purchaseServerRoute';

export const isAuthenticated = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getTokenFromHeader(req);
    const user = getTokenPayload(token);

    req.user = user;

    next();
  } catch (err) {
    res.status(401).send('Unauthenticated');
  }
};
