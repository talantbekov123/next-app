import styled from 'styled-components';
import { transparentize } from 'polished';

/* ===============================================
   Layout Components
=============================================== */
export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

/* ===============================================
   Button Groups
=============================================== */
// For small icon buttons (from first block)
export const IconButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

// For modal buttons (from modal block)
export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

/* ===============================================
   Base Button & Variants
=============================================== */
// A base button that encapsulates common styling
export const BaseButton = styled.button`
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 1rem;

  &:hover {
    background: ${(props) =>
    transparentize(0.1, props.theme.colors.primary)};
  }
`;

// A small icon button (used in toolbars, etc.)
export const IconButton = styled(BaseButton)`
  height: 2rem;
  width: 2rem;
  background: ${(props) => props.theme.colors.gray};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// A primary button used in modals (larger, padded button)
export const Button = styled(BaseButton)`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  border: none;
  font-weight: 600;

  &:disabled {
    background: ${(props) => props.theme.colors.gray};
    cursor: not-allowed;
  }
`;

// A cancel button variant extending the modal button
export const ModalCancelButton = styled(Button)`
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.primary};

  &:hover {
    background: ${(props) =>
    transparentize(0.9, props.theme.colors.primary)};
  }
`;

// A button variant used in Loan components
export const LoanButton = styled(BaseButton)`
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  margin-top: 1.5rem;
`;

/* ===============================================
   Loan Components
=============================================== */
export const LoanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    transparentize(0.1, props.theme.colors.gray)};
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.75rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
`;

export const LoanDetail = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  margin: 0.5rem 0;
  width: 100%;
  text-align: left;

  span {
    font-weight: bold;
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const Message = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  margin-top: 2rem;
`;

/* ===============================================
   Loan Card Components
=============================================== */
export const LoanCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const LoanInfo = styled.div`
  margin-bottom: 1rem;
`;

export const LoanField = styled.p`
  margin: 0.3rem 0;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};

  span {
    font-weight: bold;
  }
`;

export const NoLoans = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  margin-top: 2rem;
`;

/* ===============================================
   Modal Components
=============================================== */
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: ${(props) => props.theme.colors.background};
  padding: 2.5rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const ModalTitle = styled.h2`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
  font-size: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) =>
    transparentize(0.2, props.theme.colors.primary)};
  }
`;

export const ResultContainer = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border: 2px dashed ${(props) => props.theme.colors.primary};
  border-radius: 0.75rem;
  background: ${(props) =>
    transparentize(0.95, props.theme.colors.primary)};
`;

export const ResultAmount = styled.h1`
  font-size: 3.5rem;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.colors.primary};
`;

export const ResultDetails = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  margin-top: 0.5rem;
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

export const SliderLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

export const SliderInput = styled.input`
  width: 100%;
  appearance: none;
  height: 10px;
  background: ${(props) =>
    transparentize(0.8, props.theme.colors.primary)};
  border-radius: 5px;
  outline: none;
  transition: background 0.3s ease;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary};
    border: 2px solid ${(props) => props.theme.colors.gray};
    cursor: pointer;
    transition: background 0.3s ease;
  }

  &::-webkit-slider-thumb:hover {
    background: ${(props) =>
    transparentize(0.1, props.theme.colors.primary)};
  }
`;

export const CollateralInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.5rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 5px
      ${(props) =>
    transparentize(0.5, props.theme.colors.primary)};
  }

  &::placeholder {
    color: ${(props) =>
    transparentize(0.5, props.theme.colors.text)};
  }
`;
