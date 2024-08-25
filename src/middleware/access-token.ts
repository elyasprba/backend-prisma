import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from './response';

interface UserData {
  id: string;
  email: string;
}

interface ValidationRequest extends Request {
  userData: UserData;
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers as any;

  if (!authorization) {
    return errorResponse(res, 401, 'Missing Authorization Token');
  }

  const token = authorization.split(' ')[1];

  const secret = process.env.JWT_SECRET!;

  try {
    const jwtDecode = jwt.verify(token, secret);

    if (typeof jwtDecode !== 'string') {
      validationReq.userData = jwtDecode as UserData;
    }
  } catch (error) {
    return errorResponse(res, 401, 'Unauthorized');
  }
  next();
};
