import styled from 'styled-components';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

type HeroImageVariant = 'primary' | 'secondary' | 'accent';

export const HeroContainer = styled.section`
  position: relative;
  overflow: hidden;
  margin-bottom: 28px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background:
    linear-gradient(135deg, rgba(26, 26, 26, 0.03) 0%, transparent 55%),
    ${({ theme }) => theme.colors.background};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(${({ theme }) => theme.colors.borderLight} 1px, transparent 1px),
      linear-gradient(90deg, ${({ theme }) => theme.colors.borderLight} 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.18;
    pointer-events: none;
  }
`;

export const HeroGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 40px;
  align-items: center;
  padding: 56px 48px;

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 36px 20px 28px;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 560px;
`;

export const HeroEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  margin-bottom: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const HeroTitle = styled.h1`
  margin: 0 0 16px;
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  line-height: 0.95;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

export const HeroSubtitle = styled.p`
  margin: 0 0 28px;
  max-width: 480px;
  font-size: clamp(${({ theme }) => theme.fontSizes.body}, 2vw, ${({ theme }) => theme.fontSizes.md});
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
`;

export const HeroCta = styled.a<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 165px;
  height: 50px;
  padding: 0 28px;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.button};
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  ${({ $variant = 'primary', theme }) =>
    $variant === 'primary'
      ? `
    background-color: ${theme.colors.text};
    color: ${theme.colors.background};

    &:hover {
      background-color: ${theme.colors.background};
      color: ${theme.colors.text};
    }
  `
      : `
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};

    &:hover {
      background-color: ${theme.colors.text};
      color: ${theme.colors.background};
    }
  `}

  ${focusVisible}
`;

export const HeroFeatures = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const HeroFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSubtle};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
    flex-shrink: 0;
  }
`;

export const HeroVisual = styled.div`
  position: relative;
  min-height: 420px;

  ${media.tablet} {
    min-height: 320px;
    max-width: 520px;
    margin: 0 auto;
    width: 100%;
  }
`;

export const HeroImageStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 420px;

  ${media.tablet} {
    min-height: 320px;
  }
`;

export const HeroImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  transition: transform 0.6s ease;
`;

export const HeroImageCard = styled.div<{ $variant: HeroImageVariant }>`
  position: absolute;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};

  &:hover ${HeroImage} {
    transform: scale(1.04);
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          top: 0;
          right: 0;
          width: 72%;
          height: 78%;
          z-index: 2;
        `;
      case 'secondary':
        return `
          left: 0;
          bottom: 0;
          width: 52%;
          height: 54%;
          z-index: 3;
        `;
      case 'accent':
        return `
          top: 12%;
          left: 18%;
          width: 34%;
          height: 34%;
          z-index: 4;
        `;
    }
  }}

  ${media.tablet} {
    ${({ $variant }) =>
      $variant === 'primary' &&
      `
      width: 76%;
      height: 72%;
    `}
  }
`;

export const HeroCategoryNav = styled.nav`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 18px 48px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};

  ${media.tablet} {
    padding: 16px 20px 20px;
    overflow-x: auto;
    flex-wrap: nowrap;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const HeroCategoryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
  text-transform: uppercase;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
  }

  ${focusVisible}
`;