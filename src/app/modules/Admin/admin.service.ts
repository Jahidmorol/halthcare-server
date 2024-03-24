import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdmins = async (query: any) => {
  const { searchTerm, ...filterData } = query;
  const andCondition: Prisma.AdminWhereInput[] = [];
  const adminSearchableFields = ["name", "email"];

  if (query.searchTerm) {
    andCondition.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const adminFilteredFields = Object.keys(filterData);
  if (adminFilteredFields.length > 0) {
    andCondition.push({
      AND: adminFilteredFields.map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
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
