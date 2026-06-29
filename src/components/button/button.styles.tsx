import styled from 'styled-components';
import { SpinnerContainer } from '@/components/spinner/spinner.styles';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: ${({ theme }) => theme.letterSpacing.button};
  line-height: 50px;
  padding: 0 35px;
  font-size: 15px;
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.text};
  }

  ${focusVisible}

  ${media.mobile} {
    min-width: 0;
    width: 100%;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.google};
  color: ${({ theme }) => theme.colors.background};
  text-transform: none;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: 0.25px;
  gap: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: ${({ theme }) => theme.colors.googleHover};
    border: none;
    color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
    border: none;
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  height: 30px;
  width: 30px;
`;