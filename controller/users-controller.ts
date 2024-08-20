import { NextFunction, Request, Response } from 'express';

import { prisma } from '../utils/prisma';
import { errorResponse } from '../middleware/response';

export const getAllUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;
    const skip = (page - 1) * limit;

    const result = await prisma.users.findMany({
      take: Number(limit),
      skip: skip,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        date_of_birth: true,
        gender: true,
        image: true,
        address: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    const resultCount = await prisma.users.count();

    const totalPage = Math.ceil(resultCount / limit);

    res
      .json({
        data: result,
        current_page: page - 0,
        result_page: totalPage,
        result_data: resultCount,
      })
      .status(200);
  } catch (error) {
    errorResponse(res, 500, error);
  }
};
