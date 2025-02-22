import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const geLoans = async function () {
  try {
    const loans = await prisma.loan.findMany();
    prisma.$disconnect();
    return loans;
  } catch {
    return [];
  }
  
}

export const calculateAPR = function (duration: number) {
  const baseAPR = 10;
  const maxAPR = 25;

  const apr = baseAPR + ((duration - 36) / (84 - 36)) * (maxAPR - baseAPR);

  return Math.min(Math.max(apr, baseAPR), maxAPR); // Ограничиваем диапазон
}


