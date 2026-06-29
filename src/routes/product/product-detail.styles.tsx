import styled from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';

export const ProductDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 20px 0 60px;

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const ImageColumn = styled.div`
  width: 100%;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  text-transform: capitalize;
`;

export const ProductPrice = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
`;

export const ProductDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.lineHeights.body};
  margin: 0;
`;

export const BackNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  margin-bottom: 24px;
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