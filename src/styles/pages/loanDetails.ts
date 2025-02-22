import styled from 'styled-components';
import { transparentize } from 'polished';
import { Button } from './common';

export const LoanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => transparentize(0.1, props.theme.colors.gray)};
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

export const LoanDetailsButton = styled(Button)`
  margin-top: 1.5rem;
`;

export const Message = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  margin-top: 2rem;
`;