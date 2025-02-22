import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Head from 'next/head';
import PageFrame from '../../components/PageFrame';
import { LoanDetail, LoanContainer, Message, LoanDetailsButton } from '../../styles/pages/loanDetails';
import { Loan } from '../../types';

const LoanDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchLoanDetails(id as string);
    }
  }, [id]);

  const fetchLoanDetails = async (loanId: string) => {
    try {
      const response = await axios.get(`/api/loans/${loanId}`);
      setLoan(response.data);
    } catch (error) {
      toast.error('Failed to fetch loan details');
    } finally {
      setLoading(false);
    }
  };

  const BackButton = (
    <LoanDetailsButton onClick={() => router.back()}>Go Back</LoanDetailsButton>
  );

  const renderLoanDetails = () => (
    <LoanContainer>
      <LoanDetail><span>ID:</span> {loan?.id}</LoanDetail>
      <LoanDetail><span>Amount:</span> ${loan?.amount}</LoanDetail>
      <LoanDetail><span>Interest:</span> {loan?.interest}%</LoanDetail>
      <LoanDetail><span>Duration:</span> {loan?.duration} months</LoanDetail>
      <LoanDetail><span>Collateral:</span> {loan?.collateral}</LoanDetail>
      {loan?.createdAt && (
        <LoanDetail><span>Created At:</span> {new Date(loan.createdAt).toLocaleString()}</LoanDetail>
      )}
      {loan?.updatedAt && (
        <LoanDetail><span>Updated At:</span> {new Date(loan.updatedAt).toLocaleString()}</LoanDetail>
      )}
      {BackButton}
    </LoanContainer>
  );

  return (
    <PageFrame title="Loan Details" subtitle={loan ? `Details for Loan ID: ${loan.id}` : 'Loading loan details...'} actionButton={null}>
      <Head>
        <title>{`Loan Details - ${id}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && <Message>Loading loan details...</Message>}
      {!loading && !loan && <Message>No loan found with the provided ID.</Message>}
      {!loading && loan && renderLoanDetails()}
    </PageFrame>
  );
};

export default LoanDetails; 