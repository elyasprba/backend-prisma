import { prisma } from '../config/prisma';
import { GetAllProductParams, ProductsPayload } from '../constant/types';

export const createProductsModel = async (
  body: ProductsPayload,
  file: { path: string }
) => {
  try {
    const { name, description, price, stock, category } = body;

    const image = file ? file.path : null;

    const result = await prisma.products.create({
      data: {
        name,
        description,
        price: Number(price),
        image: image!,
        stock: Number(stock),
        category,
      },
    });

    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    throw new Error(errorMessage);
  }
};

export const getAllProductsModel = async (params: GetAllProductParams) => {
  try {
    const { limit, skip, name, category } = params;

    const result = await prisma.products.findMany({
      take: Number(limit),
      skip: skip,
      where: {
        AND: [
          name ? { name: { contains: name.toLowerCase() } } : {},
          category ? { category: { contains: category.toLowerCase() } } : {},
        ],
      },
    });

    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    throw new Error(errorMessage);
  }
};
