// ButtonGroup.tsx
import React from 'react';
import { FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { IconButtonGroup, IconButton } from '../../styles/pages/common';
import { DefaultTheme } from 'styled-components';
import { Loan } from '../../types';
interface ButtonGroupProps {
  loan: Loan;
  deletingLoanId: string | null;
  theme: DefaultTheme;
  openEditModal(loan: Loan): void;
  handleDelete(id: string): void;
  handleViewLoan(id: string): void;
}

const LoanButtonGroup: React.FC<ButtonGroupProps> = ({
  loan,
  deletingLoanId,
  theme,
  openEditModal,
  handleDelete,
  handleViewLoan,
}) => {
  return (
    <IconButtonGroup>
      <IconButton onClick={() => openEditModal(loan)} aria-label="Edit Loan">
        <FiEdit2 size={18} color={theme.colors.primary} />
      </IconButton>
      <IconButton
        disabled={deletingLoanId === loan.id}
        onClick={() => handleDelete(loan.id)}
        aria-label="Delete Loan"
      >
        <FiTrash2 size={18} color={theme.colors.primary} />
      </IconButton>
      <IconButton onClick={() => handleViewLoan(loan.id)} aria-label="View Loan Details">
        <FiExternalLink size={18} color={theme.colors.primary} />
      </IconButton>
    </IconButtonGroup>
  );
};

export default LoanButtonGroup;