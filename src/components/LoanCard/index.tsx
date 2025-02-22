import React, { ReactNode } from 'react';
import { LoanCard as StyledLoanCard, LoanInfo, LoanField } from '../../styles/pages/common';
import { Loan } from '../../types';

interface LoanCardProps {
  loan: Loan;
  ButtonGroup: ReactNode;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, ButtonGroup }) => {
  return (
    <StyledLoanCard>
      <LoanInfo>
        <LoanField>
          <span>Amount:</span> ${loan.amount}
        </LoanField>
        <LoanField>
          <span>Interest:</span> {loan.interest}%
        </LoanField>
        <LoanField>
          <span>Duration:</span> {loan.duration} months
        </LoanField>
        <LoanField>
          <span>Collateral:</span> {loan.collateral}
        </LoanField>
      </LoanInfo>
      {ButtonGroup}
    </StyledLoanCard>
  );
};

export default LoanCard;
