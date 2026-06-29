import styled from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';

export const BackNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const BackLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
  color: ${({ theme }) => theme.colors.textMuted};
  display: inline-block;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 25px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: 25px;
  text-align: center;
`;