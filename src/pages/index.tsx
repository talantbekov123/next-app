
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';

import LoanList from '../components/LoanList';
import Modal from '../components/Modal';
import PageFrame from '../components/PageFrame';
import { Add } from '../styles/pages/home';
import { GetServerSideProps } from 'next';
import { geLoans } from '../utils';
import { Loan, ModalHandles } from '../types';

export default function Home({ loans: storedLoans }) {
  const [loans, setLoans] = useState<Array<Loan>>(storedLoans);
  const modalRef = useRef<ModalHandles>(null);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  const openModal = useCallback(() => {
    modalRef.current?.openModal();
  }, []);

  const openEditModal = useCallback((loan: Loan) => {
    modalRef.current?.openEditModal(loan);
  }, []);

  const AddButton = (
    <Add onClick={openModal} data-tip data-for="add">
      <FiPlus size={36} color="#fff" />
    </Add>
  );

  return (
    <div>
      <Head>
        <title>Loan Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageFrame title="Manage My Loans" subtitle="Keep track of all your loans efficiently." actionButton={AddButton}>
        <LoanList loans={loans} openEditModal={openEditModal} setLoans={setLoans} />
      </PageFrame>

      <Modal loans={loans} setLoans={setLoans} ref={modalRef} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const loans = await (await geLoans()).map((loan) => {
    return {
      ...loan,
      createdAt: loan.createdAt instanceof Date ? loan.createdAt.toISOString() : loan.createdAt,
      updatedAt: loan.updatedAt instanceof Date ? loan.updatedAt.toISOString() : loan.updatedAt,
    };
  });

  return {
    props: {
      loans,
    },
  };
};
