import { Request, Response } from 'express';

import { prisma } from '../config/prisma';
import { errorResponse } from '../utils/response';
import { getAllUserModel, updateUserModel } from '../model/users.model';

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      email,
      id,
    } = req.query as Partial<Record<string, string>>;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    const result = await getAllUserModel(limitNumber, skip, email, id);

    if (!result?.length) {
      errorResponse(res, 404, 'User Not Found');
      return;
    }

    const resultCount = await prisma.users.count();

    const totalPage = Math.ceil(resultCount / limitNumber);

    res
      .json({
        data: result,
        current_page: pageNumber - 0,
        result_page: totalPage,
        result_data: resultCount,
      })
      .status(200);
    return;
  } catch (error) {
    errorResponse(res, 500, error);
    return;
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const updateData = req.body;
    const file = req.file;

    if (!Object.keys(updateData).length && !file) {
      errorResponse(res, 200, 'No data has been updated!');
      return;
    }

    const updatedUser = await updateUserModel(
      {
        id,
        updated_at: new Date(),
        ...updateData,
      },
      file
    );

    return res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    errorResponse(res, 500, error);
    return;
  }
};
