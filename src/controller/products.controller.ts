import { Request, Response } from 'express';
import { getAllProducts } from '../model/products.model';
import { errorResponse } from '../utils/response';
import { prisma } from '../config/prisma';

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

    const result = await getAllProducts(limitNumber, skip, name, category);

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
