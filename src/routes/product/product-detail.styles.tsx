import styled from 'styled-components';
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

export const BackLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};
  margin-bottom: 20px;
  display: inline-block;
`;