import styled from 'styled-components';
import { media } from '@/styles/theme';

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 60px 20px;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;

  ${media.tablet} {
    padding: 48px 16px;
  }

  ${media.narrow} {
    padding: 36px 8px;
    gap: 12px;
  }
`;

export const SuccessTitle = styled.h1`
  font-size: clamp(1.75rem, 5vw, ${({ theme }) => theme.fontSizes.xxl});
`;

export const SuccessMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 480px;
  margin: 0;
  line-height: ${({ theme }) => theme.lineHeights.body};

  ${media.narrow} {
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;