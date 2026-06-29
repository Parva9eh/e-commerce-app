import styled from 'styled-components';
import { BaseButton, GoogleSignInButton, InvertedButton } from '@/components/button/button.styles';
import { media } from '@/styles/theme';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 280px;
  height: 360px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  top: calc(100% + 12px);
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown + 1};

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }

  ${media.tablet} {
    position: fixed;
    left: 10px;
    right: 10px;
    width: auto;
    top: 72px;
    height: auto;
    max-height: calc(100vh - 88px);
  }

  ${media.narrow} {
    left: 8px;
    right: 8px;
    top: 64px;
    padding: 16px;
    max-height: calc(100vh - 80px);
  }
`;

export const EmptyMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  ${media.tablet} {
    height: auto;
    max-height: calc(100vh - 220px);
  }
`;