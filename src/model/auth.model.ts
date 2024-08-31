import { prisma } from '../config/prisma';

export const registerAuthModel = async (
  email: string,
  hashPassword: string,
  phoneNumber: string
) => {
  try {
    const result = await prisma.users.create({
      data: {
        email,
        password: hashPassword,
        phone_number: phoneNumber,
      },
    });

    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    throw new Error(errorMessage);
  }
};
