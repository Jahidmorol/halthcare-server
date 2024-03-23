import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const createAdmin = async (password: string, payload: any) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  const userData = {
    email: payload.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });

    const createdAdmin = await transactionClient.admin.create({
      data: payload,
    });

    return createdAdmin;
  });

  return result;
};

export const userService = {
  createAdmin,
};
