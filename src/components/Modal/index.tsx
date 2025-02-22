import React, { useState, useCallback, useContext, forwardRef, useImperativeHandle, FormEvent, Dispatch, SetStateAction } from 'react';
import { ThemeContext, DefaultTheme } from 'styled-components';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  SliderContainer,
  SliderLabel,
  SliderInput,
  ResultContainer,
  ResultAmount,
  ResultDetails,
  ModalButtonGroup as ButtonGroup,
  Button,
  ModalCancelButton as CancelButton,
  CollateralInput,
} from '../../styles/pages/common';
import { Loan, ModalHandles } from '../../types';
import { calculateAPR } from '../../utils';

interface Props {
  loans: Array<Loan>;
  setLoans: Dispatch<SetStateAction<Loan[]>>;
}

const LoanModalSlider: React.ForwardRefRenderFunction<ModalHandles, Props> = (
  { loans, setLoans },
  ref
) => {
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(20000);
  const [interest, setInterest] = useState(calculateAPR(48));
  const [duration, setDuration] = useState(48);
  const [collateral, setCollateral] = useState('');
  const [loan, setLoan] = useState<Loan | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const theme = useContext<DefaultTheme>(ThemeContext);

  const clearFields = useCallback(() => {
    setAmount(20000);
    setInterest(calculateAPR(48));
    setDuration(48);
    setCollateral('');
    setLoan(null);
  }, []);

  const closeModal = useCallback(() => {
    clearFields();
    setVisible(false);
  }, [clearFields]);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const openEditModal = useCallback((loan: Loan) => {
    setAmount(loan.amount ?? 20000);
    setInterest(loan.interest ?? calculateAPR(48));
    setDuration(loan.duration ?? 48);
    setCollateral(loan.collateral ?? '');
    setLoan(loan);
    setVisible(true);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    openEditModal,
  }));

  const calculateMonthlyPayment = () => {
    const monthlyRate = interest / 100 / 12;
    const numPayments = duration;
    const monthlyPayment =
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    return monthlyPayment.toFixed(0);
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setButtonDisabled(true);
      const newLoan = { amount, interest, duration, collateral };
      if (loan) {
        // Update existing loan
        await axios.put(`/api/loans/${loan.id}`, newLoan);
        toast.success('Loan updated successfully');
        setLoans(loans.map((l) => (l.id === loan.id ? { ...newLoan, id: loan.id } : l)));
      } else {
        // Create new loan
        const response = await axios.post('/api/loans', newLoan);
        toast.success('Loan added successfully');
        setLoans([...loans, { ...response.data }]);
      }
      closeModal();
    } catch (error) {
      if(error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error saving loan, please try again.');
      }
    } finally {
      setButtonDisabled(false);
    }
  }

  if (!visible) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{loan ? 'Edit Loan' : 'Add Loan'}</ModalTitle>
          <CloseButton onClick={closeModal}>
            <FiX size={24} color={theme.colors.primary} />
          </CloseButton>
        </ModalHeader>

        <ResultContainer>
          <p>Estimated Monthly Payment</p>
          <ResultAmount>${calculateMonthlyPayment()}</ResultAmount>
          <ResultDetails>
            {interest}% APR<br />
            Total Cost: ${(Number(calculateMonthlyPayment()) * duration).toFixed(0)}
          </ResultDetails>
        </ResultContainer>

        <SliderContainer>
          <SliderLabel>Amount: ${amount}</SliderLabel>
          <SliderInput
            type="range"
            min="2500"
            max="40000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <SliderLabel>Length: {duration} Months</SliderLabel>
          <SliderInput
            type="range"
            min="36"
            max="84"
            value={duration}
            onChange={(e) => {
              const newDuration = Number(e.target.value);
              setDuration(newDuration);
              setInterest(calculateAPR(newDuration)); // Автоматически обновляем APR
            }}
          />

          <SliderLabel>Collateral:</SliderLabel>
          <CollateralInput
            type="text"
            value={collateral}
            onChange={(e) => setCollateral(e.target.value)}
            placeholder="Enter collateral details"
          />
        </SliderContainer>

        <ButtonGroup>
          <CancelButton type="button" onClick={closeModal}>
            Cancel
          </CancelButton>
          <Button type="button" onClick={handleSubmit} disabled={buttonDisabled}>
            {loan ? 'Update' : 'Add Loan'}
          </Button>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default forwardRef(LoanModalSlider);