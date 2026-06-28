import styled from 'styled-components';
import Link from 'next/link';

export const ProductLink = styled(Link)`
  display: block;
  width: 100%;
`;

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  button {
    width: 80%;
    max-width: 100%;
    opacity: 0.9;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 52px;
    display: flex;
  }

  &:hover > div:first-of-type img {
    opacity: 0.85;
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  padding: 10px 0 4px;
  font-size: ${({ theme }) => theme.fontSizes.md};
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