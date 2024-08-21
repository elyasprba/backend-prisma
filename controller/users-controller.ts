import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { prisma } from '../utils/prisma';
import { errorResponse } from '../middleware/response';
import { getAllUserModel, updateUserModel } from '../model/users-model';

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, email, id } = req.query as any;
    const skip = (page - 1) * limit;

    const result = await getAllUserModel(limit, skip, email, id);

    if (!result?.length) {
      errorResponse(res, 404, 'User Not Found');
      return;
    }

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

    if (!Object.keys(updateData).length) {
      errorResponse(res, 200, 'No data has been updated!');
      return;
    }

    const updatedUser = await updateUserModel({
      id,
      updated_at: new Date(),
      ...updateData,
    });

    return res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    errorResponse(res, 500, 'Failed to update user');
    return;
  }
};
