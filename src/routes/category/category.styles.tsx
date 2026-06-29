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
  width: 100%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 20px;
  row-gap: 50px;

  ${media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 28px;
  }

  ${media.narrow} {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 28px;
  }
`;

export const Title = styled.h2`
  font-size: clamp(1.75rem, 5vw, ${({ theme }) => theme.fontSizes.xxl});
  margin-bottom: 25px;
  text-align: center;
`;