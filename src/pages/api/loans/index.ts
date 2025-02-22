import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import logger from '../../../utils/logger';
import { isValidLoanFields } from '../../../utils/validation';

const prisma = new PrismaClient();

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    switch (req.method) {
    case 'GET':
      try {
        const loans = await prisma.loan.findMany();
        return res.status(200).json(loans);
      } catch (error: any) {
        logger.error('Error fetching loans', { message: error.message });
        return res.status(500).json({ message: 'Failed to fetch loans' });
      }

    case 'POST':
      try {
        const { amount, interest, duration, collateral } = req.body;
        const validation = isValidLoanFields({ amount, interest, duration, collateral });

        if (!validation.isValid) {
          logger.warn('Validation failed for loan creation', req.body);
          return res.status(400).json({ message: validation.message });
        }

        const newLoan = await prisma.loan.create({
          data: {
            amount: parseFloat(amount),
            interest: parseFloat(interest),
            duration: parseInt(duration, 10),
            collateral,
          },
        });

        return res.status(201).json(newLoan);
      } catch (error: any) {
        logger.error('Error creating loan', { message: error.message });
        return res.status(500).json({ message: 'Failed to create loan' });
      }

    default:
      logger.warn('Method not allowed', { method: req.method });
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error: any) {
    logger.error('API Error', { message: error.message });
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};
