import styled from 'styled-components';
import { media } from '@/styles/theme';

export const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 20px 56px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  ${media.tablet} {
    padding: 32px 12px 40px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

export const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 520px;
  margin: 0 0 28px;
  line-height: ${({ theme }) => theme.lineHeights.body};
`;

export const HeroCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 165px;
  height: 50px;
  padding: 0 35px;
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.button};
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;