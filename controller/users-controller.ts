import { NextFunction, Request, Response } from 'express';

import { prisma } from '../utils/prisma';

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;
    const skip = (page - 1) * limit;

    const allUsers = await prisma.users.findMany({
      take: Number(limit),
      skip: skip,
    });

    const resultCount = await prisma.users.count();

    const totalPage = Math.ceil(resultCount / limit);

    res
      .json({
        data: allUsers,
        current_page: page - 0,
        result_page: totalPage,
        result_data: resultCount,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
};
