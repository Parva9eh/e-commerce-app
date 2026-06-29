import styled from 'styled-components';
import { media } from '@/styles/theme';

export const ShopPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ShopTitle = styled.h1`
  margin: 0 0 24px;
  font-size: clamp(1.75rem, 5vw, ${({ theme }) => theme.fontSizes.xxl});
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.nav};

  ${media.narrow} {
    margin-bottom: 20px;
  }
`;

export const ShopEmptyMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
`;