import styled from 'styled-components';
import Button from '@/components/button/button.component';
import { media } from '@/styles/theme';

export const PaymentFormContainer = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  min-height: 100px;
  padding: 0 10px;

  ${media.tablet} {
    max-width: 100%;
  }
`;

export const CardElementWrapper = styled.div`
  padding: 14px 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 0;
  margin-bottom: 10px;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;

  ${media.tablet} {
    margin-left: 0;
    width: 100%;
  }
`;