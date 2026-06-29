import styled from 'styled-components';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const ShopToolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 30px;
`;

export const MobileSearchForm = styled.form`
  display: none;
  width: 100%;

  ${media.tablet} {
    display: block;
  }
`;

export const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;

  ${media.narrow} {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
`;

export const FilterGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
`;

export const FilterSelect = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};

  ${focusVisible}
`;

export const MobileSearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};

  ${focusVisible}
`;