import styled from 'styled-components';
import { media } from '@/styles/theme';

export const FooterContainer = styled.footer`
  margin-top: 60px;
  padding: 32px 0 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 20px;

  ${media.tablet} {
    flex-direction: column;
    gap: 8px;
  }
`;

export const FooterLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};

  &:hover {
    text-decoration: underline;
  }
`;