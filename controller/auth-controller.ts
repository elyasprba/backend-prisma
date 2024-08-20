import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../utils/prisma';
import { errorResponse } from '../middleware/response';
import { hashPhoneNumber } from '../utils/hash-phone-number';
import { expiresInRefreshToken, expiresInToken } from '../constant/time';

export const regiterUser = async (req: Request, res: Response) => {
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
          phone_number: hashPhoneNumber(result.phone_number),
          created_at: result.created_at,
        },
      })
      .status(201);
  } catch (error) {
    errorResponse(res, 500, error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
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

      const secretToken = process.env.JWT_SECRET!;
      const secretRefreshToken = process.env.JWT_SECRET!;

      const accessToken = jwt.sign(payload, secretToken, {
        expiresIn: expiresInToken,
      });

      const refreshToken = jwt.sign(payload, secretRefreshToken, {
        expiresIn: expiresInRefreshToken,
      });

      await prisma.users.update({
        where: { email },
        data: {
          refresh_token: refreshToken,
        },
      });

      return res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      errorResponse(res, 403, 'Wrong Password!');
    }
  } catch (error) {
    errorResponse(res, 500, error);
  }
};

export const refreshTokenUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    const secretToken = process.env.JWT_SECRET!;
    const secretRefreshToken = process.env.JWT_SECRET!;

    const token = authHeader?.split(' ')[1];

    if (!token) {
      return errorResponse(res, 401, 'Unauthorized');
    }

    const data = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    );

    const user = await prisma.users.findUnique({
      where: {
        id: data.id,
        email: data.email,
      },
    });

    if (token !== user?.refresh_token) {
      return errorResponse(res, 401, 'Unauthorized');
    }

    if (user === null) {
      return errorResponse(res, 404, 'Token refresh failed');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, secretToken, {
      expiresIn: expiresInToken,
    });
    const refreshToken = jwt.sign(payload, secretRefreshToken, {
      expiresIn: expiresInRefreshToken,
    });

    await prisma.users.update({
      where: { email: user.email },
      data: {
        refresh_token: refreshToken,
      },
    });

    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    errorResponse(res, 401, 'Unauthorized');
  }
};
