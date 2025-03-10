import { render, screen, fireEvent } from '@testing-library/react';
import LoanButtonGroup from './index';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { Loan } from '../../types';

const theme: DefaultTheme = {
  title: 'some',
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    foreground: '#f8f9fa',
    text: '#212529',
    lightText: '#6c757d',
    gray: '#adb5bd',
    lightGray: '#dee2e6',
  },
} as DefaultTheme;

// Mock loan object
const loan: Loan = {
  id: '1',
  amount: 1000,
  interest: 5,
  duration: 12,
  collateral: 'House',
};

// Mock functions
const openEditModal = jest.fn();
const handleDelete = jest.fn();
const handleViewLoan = jest.fn();

describe('LoanButtonGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all buttons correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <LoanButtonGroup
          loan={loan}
          theme={theme}
          deletingLoanId={'1'}
          openEditModal={openEditModal}
          handleDelete={handleDelete}
          handleViewLoan={handleViewLoan}
        />
      </ThemeProvider>
    );

    expect(screen.getByLabelText('Edit Loan')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete Loan')).toBeInTheDocument();
    expect(screen.getByLabelText('View Loan Details')).toBeInTheDocument();
  });

  it('calls handleViewLoan when the view loan details button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <LoanButtonGroup
          loan={loan}
          theme={theme}
          deletingLoanId={'1'}
          openEditModal={openEditModal}
          handleDelete={handleDelete}
          handleViewLoan={handleViewLoan}
        />
      </ThemeProvider>
    );

    const viewButton = screen.getByLabelText('View Loan Details');
    fireEvent.click(viewButton);

    expect(handleViewLoan).toHaveBeenCalledTimes(1);
    expect(handleViewLoan).toHaveBeenCalledWith(loan.id);
  });
});
