import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prismaClientCache: PrismaClient };

export const db =
  globalForPrisma.prismaClientCache ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaClientCache = db;
