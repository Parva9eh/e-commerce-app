import styled from 'styled-components';
import { media } from '@/styles/theme';

export const CheckoutContainer = styled.div`
  width: 55%;
  max-width: 900px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  ${media.tablet} {
    width: 100%;
    margin-top: 20px;
    min-height: auto;
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  ${media.tablet} {
    display: none;
  }
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

export const Total = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.tablet} {
    margin-left: 0;
    width: 100%;
    text-align: right;
  }
`;

export const EmptyMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin: 60px 0;
`;