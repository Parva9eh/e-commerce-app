import styled from 'styled-components';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const UserMenuTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px 6px 6px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: inherit;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover,
  &[aria-expanded='true'] {
    border-color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.surface};
  }

  ${focusVisible}
`;

export const UserAvatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  flex-shrink: 0;
`;

export const UserSummary = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  text-align: left;

  ${media.tablet} {
    display: none;
  }
`;

export const UserGreeting = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
  text-transform: uppercase;
  white-space: nowrap;
`;

export const UserStatus = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  min-width: 220px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const UserMenuEmail = styled.p`
  margin: 0 0 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  word-break: break-word;
`;

export const SignOutButton = styled.button`
  width: 100%;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.button};
  text-transform: uppercase;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  ${focusVisible}

  ${media.tablet} {
    min-height: 44px;
  }
`;