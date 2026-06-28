import styled from 'styled-components';
import { media } from '@/styles/theme';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  max-width: 100%;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  background-color: ${({ theme }) => theme.colors.surface};

  h2 {
    margin: 10px 0;
  }

  ${media.tablet} {
    width: 100%;
  }
`;

export const AuthErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 8px 0;
`;