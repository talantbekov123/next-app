import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import logger from '../../../utils/logger';
import { isValidLoanFields, isValidUUID } from '../../../utils/validation';

const prisma = new PrismaClient();

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  if (id && typeof id === 'string' && !isValidUUID(id)) {
    logger.warn('Invalid loan ID format', { id });
    return res.status(400).json({ message: 'Invalid loan ID format' });
  }

  try {
    switch (method) {
    case 'GET': {
      try {
        const loan = await prisma.loan.findUnique({ where: { id: id as string } });
        if (!loan) {
          logger.warn('Loan not found', { id });
          return res.status(404).json({ message: 'Loan not found' });
        }
        return res.status(200).json(loan);
      } catch (error: any) {
        logger.error('Error fetching loan', { message: error.message });
        return res.status(500).json({ message: 'Failed to fetch loan' });
      }
    }

    case 'PUT': {
      try {
        const { amount, interest, duration, collateral } = body;
        const validation = isValidLoanFields({ amount, interest, duration, collateral });
        if (!validation.isValid) {
          logger.warn('Invalid loan fields', { body });
          return res.status(400).json({ message: validation.message });
        }

        const updatedLoan = await prisma.loan.update({
          where: { id: id as string },
          data: { amount, interest, duration, collateral },
        });

        return res.status(200).json(updatedLoan);
      } catch (error: any) {
        logger.error('Error updating loan', { message: error.message });
        if (error.code === 'P2025') {
          return res.status(404).json({ message: 'Loan not found for update' });
        }
        return res.status(500).json({ message: 'Failed to update loan' });
      }
    }

    case 'DELETE': {
      try {
        const deletedLoan = await prisma.loan.delete({ where: { id: id as string } });
        return res.status(200).json({ message: 'Loan deleted successfully', deletedLoan });
      } catch (error: any) {
        logger.error('Error deleting loan', { message: error.message });
        if (error.code === 'P2025') {
          return res.status(404).json({ message: 'Loan not found to delete' });
        }
        return res.status(500).json({ message: 'Failed to delete loan' });
      }
    }

    default: {
      logger.warn('Method not allowed', { method });
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
    }
  } catch (error: any) {
    logger.error('Unexpected error', { message: error.message });
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};
