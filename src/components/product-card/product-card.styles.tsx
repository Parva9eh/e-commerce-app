import styled from 'styled-components';
import Link from 'next/link';
import { media } from '@/styles/theme';

export const ProductLink = styled(Link)`
  display: block;
  width: 100%;
`;

export const ProductCardContainer = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;

  button {
    width: 100%;
    max-width: 100%;
    opacity: 0.95;
    margin-top: 12px;
    display: flex;
  }

  &:hover > div:first-of-type img {
    opacity: 0.85;
  }

  ${media.tablet} {
    button {
      opacity: 1;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  padding: 12px 0 0;
  font-size: ${({ theme }) => theme.fontSizes.md};

  ${media.narrow} {
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;

export const Name = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const Price = styled.span`
  flex-shrink: 0;
  text-align: right;
`;