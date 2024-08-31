import { prisma } from '../config/prisma';

export const getAllProducts = async (
  limit: number,
  skip: number,
  name?: string,
  category?: string
) => {
  try {
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
