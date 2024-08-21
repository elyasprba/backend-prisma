import { prisma } from '../utils/prisma';

export const getAllUserModel = async (
  limit: number,
  skip: number,
  email?: string,
  id?: string
) => {
  try {
    const result = await prisma.users.findMany({
      take: Number(limit),
      skip: skip,
      where: {
        AND: [email ? { email: email } : id ? { id: id } : {}],
      },
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

    return result;
  } catch (error) {
    console.log(error);
  }
};

type UpdateUserParams = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  date_of_birth?: Date;
  gender?: string;
  image?: string;
  address?: string;
  role?: string;
  updated_at?: string;
};

export const updateUserModel = async (data: UpdateUserParams) => {
  try {
    const { id, ...updateData } = data;

    const updatedUser = await prisma.users.update({
      where: { id },
      data: updateData,
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

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update user'); // Mengembalikan error jika update gagal
  }
};
