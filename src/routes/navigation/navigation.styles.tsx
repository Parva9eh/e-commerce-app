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
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  display: flex;
  align-items: center;

  svg {
    width: 100%;
    height: auto;
  }

  ${focusVisible}

  ${media.tablet} {
    width: 50px;
    padding: 0;
  }
`;

export const NavLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
  text-transform: uppercase;

  ${focusVisible}
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