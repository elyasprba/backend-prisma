import { prisma } from '../utils/prisma';

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
    console.log(error);
  }
};
