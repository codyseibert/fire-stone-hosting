import { Request } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

export const getSignedToken = (payload: UserPayload): string => {
  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
    },
    process.env.JWT_SECRET,
  );
};

export const getTokenPayload = (token: string): UserPayload => {
  return jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
};

export const getTokenFromHeader = (req: Request) => {
  return req.headers.authorization.split(' ')[1];
};
