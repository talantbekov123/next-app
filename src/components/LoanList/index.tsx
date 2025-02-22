import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dark from '../../styles/themes/dark';

import { CardContainer, NoLoans } from '../../styles/pages/common';
import usePersistedState from '../../utils/usePersistedState';
import LoanCard from '../LoanCard';
import LoanButtonGroup from '../LoanButtonGroup';
import { DefaultTheme } from 'styled-components';
import { Loan } from '../../types';

interface LoanListProps {
  loans: Loan[];
  setLoans: Dispatch<SetStateAction<Loan[]>>;
  openEditModal(loan: Loan): void;
}

const LoanList: React.FC<LoanListProps> = ({ loans, setLoans, openEditModal }) => {
  const [deletingLoanId, setDeletingLoanId] = useState<string | null>(null);
  const [theme] = usePersistedState<DefaultTheme>('theme', dark);
  const router = useRouter();

  async function handleDelete(id: string) {
    setDeletingLoanId(id);

    const filteredLoans = loans.filter((loan) => loan.id !== id);
    setLoans(filteredLoans);

    try {
      await axios.delete(`/api/loans/${id}`);
      toast.success('Loan deleted successfully');
    } catch (error) {
      setLoans(loans);
      toast.error('Error deleting loan, please try again');
    } finally {
      setDeletingLoanId(null);
    }
  }

  function handleViewLoan(id: string) {
    router.push(`/loans/${id}`);
  }

  if (loans.length === 0) {
    return <NoLoans>No loans available yet :c</NoLoans>;
  }

  return (
    <CardContainer>
      {loans.map((loan) => (
        <LoanCard
          key={loan.id}
          loan={loan}
          ButtonGroup={
            <LoanButtonGroup
              loan={loan}
              deletingLoanId={deletingLoanId}
              theme={theme}
              openEditModal={openEditModal}
              handleDelete={handleDelete}
              handleViewLoan={handleViewLoan}
            />
          }
        />
      ))}
    </CardContainer>
  );
};

export default LoanList;
