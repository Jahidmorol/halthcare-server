import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdmins = async (query: any) => {
  const andCondition: Prisma.AdminWhereInput[] = [];

  if (query.searchTerm) {
    andCondition.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
    where: whereCondition,
  });

  return result;
};

export const adminService = {
  getAllAdmins,
};
