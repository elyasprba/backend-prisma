import { Request, Response } from 'express';
import {
  createProductsModel,
  getAllProductsModel,
} from '../model/products.model';
import { errorResponse } from '../utils/response';
import { prisma } from '../config/prisma';

export const createProductsController = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: 'Image cannot be empty!',
      });
    }

    const result = await createProductsModel(req.body, file);

    res
      .json({
        message: 'Create product success',
        data: result,
      })
      .status(201);
  } catch (error) {
    errorResponse(res, 500, error);
    return;
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      name,
      category,
    } = req.query as Partial<Record<string, string>>;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    const result = await getAllProductsModel({
      limit: limitNumber,
      skip,
      name,
      category,
    });

    if (!result?.length) {
      errorResponse(res, 404, 'User Not Found');
      return;
    }

    const resultCount = await prisma.products.count();

    const totalPage = Math.ceil(resultCount / limitNumber);

    res
      .json({
        data: result,
        current_page: pageNumber - 0,
        result_page: totalPage,
        result_data: result.length,
      })
      .status(200);
  } catch (error) {
    errorResponse(res, 500, error);
    return;
  }
};
