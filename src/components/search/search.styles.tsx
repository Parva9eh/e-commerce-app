import styled from 'styled-components';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-right: 8px;

  ${media.tablet} {
    display: none;
  }
`;

export const SearchInput = styled.input`
  width: 160px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  ${focusVisible}
`;