import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../utils/prisma';
import { errorResponse } from '../middleware/response';

export const regiterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, phone_number } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const findUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      errorResponse(res, 200, 'Email sudah digunakan');
    }

    const result = await prisma.users.create({
      data: {
        email,
        password: hashPassword,
        phone_number,
      },
    });

    res
      .json({
        message: 'Register success!',
        // Basic information about the newly registered user (but avoid sensitive information like passwords).
        data: {
          id: result.id,
          email: result.email,
          created_at: result.created_at,
        },
      })
      .status(201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return errorResponse(res, 404, 'User Not Found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const payload = {
        id: user.id,
        email: user.email,
      };

      const secret = process.env.JWT_SECRET!;

      const expiresIn = 60 * 60 * 1;

      const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

      return res.json({
        data: {
          id: user.id,
          email: user.email,
        },
        token: token,
      });
    } else {
      errorResponse(res, 403, 'Wrong Password!');
    }
  } catch (error) {
    next(error);
  }
};
