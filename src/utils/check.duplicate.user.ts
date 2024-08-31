import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { errorResponse } from './response';

export const checkDuplicate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const findUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      errorResponse(res, 400, 'Email is already in use');
      return;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
