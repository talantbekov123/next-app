import { calculateAPR } from '.';

export const isValidLoanFields = ({ amount, interest, duration, collateral }: { amount: number; interest: number; duration: number; collateral: string }) => {
  const computedAPR = calculateAPR(duration);
  if (computedAPR !== interest) {
    return {
      isValid: false,
      message: `Interest must match the calculated APR of ${computedAPR}. Received: ${interest}.`,
    };
  }
  
  if (amount === undefined || amount < 2500 || amount > 40000) {
    return { isValid: false, message: 'Amount must be between 2500 and 40000 and cannot be negative' };
  }

  if (interest === undefined || interest < 10 || interest > 25) {
    return { isValid: false, message: 'Interest must be between 10 and 25' };
  }

  if (duration === undefined || duration < 36 || duration > 84) {
    return { isValid: false, message: 'Duration must be between 36 and 84 months' };
  }

  if (
    !collateral || 
    typeof collateral !== 'string' || 
    collateral.trim() === '' || 
    collateral.length > 20 || 
    !/^[A-Za-z ]+$/.test(collateral)
  ) {
    return { isValid: false, message: 'Collateral must only contain English letters, not be empty, and have a maximum of 20 characters' };
  }
  

  return { isValid: true, message: '' };
};


export const isValidUUID = (uuid: string) =>
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
    uuid
  );
