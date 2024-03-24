import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelpers";

const prisma = new PrismaClient();

const getAllAdmins = async (query: any, options: any) => {
  const { limit, skip } = paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterData } = query;
  const andCondition: Prisma.AdminWhereInput[] = [];

  if (query.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
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
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  return result;
};

export const adminService = {
  getAllAdmins,
};
