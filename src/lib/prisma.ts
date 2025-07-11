import { PrismaClient } from "@prisma/client";

const globalForPrisma = {
  prisma: undefined as PrismaClient | undefined,
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
