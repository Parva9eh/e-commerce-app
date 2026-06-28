import styled from 'styled-components';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 30px;
  align-items: center;
`;

export const FilterGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
`;

export const FilterSelect = styled.select`
  min-width: 160px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};

  ${focusVisible}

  ${media.tablet} {
    min-width: 140px;
  }
`;

export const MobileSearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  display: none;

  ${media.tablet} {
    display: block;
  }

  ${focusVisible}
`;