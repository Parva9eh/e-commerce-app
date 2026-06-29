'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const NavigationContainer = styled.header`
  position: relative;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  ${media.tablet} {
    height: 60px;
    padding: 10px 0;
    margin-bottom: 20px;
  }

  ${media.mobile} {
    height: 56px;
    margin-bottom: 16px;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 8px 12px 8px 0;

  svg {
    width: 52px;
    height: auto;
    display: block;
  }

  ${focusVisible}

  ${media.tablet} {
    padding: 4px 8px 4px 0;

    svg {
      width: 44px;
    }
  }
`;

export const NavLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-width: 0;

  ${media.mobile} {
    gap: 4px;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
  text-transform: uppercase;
  white-space: nowrap;

  ${focusVisible}

  ${media.mobile} {
    padding: 8px 10px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export const SignOutButton = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  background: none;
  border: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
  text-transform: uppercase;
  color: inherit;

  ${focusVisible}
`;

export const CartActionsContainer = styled.div`
  position: relative;
`;