import styled from 'styled-components';

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    display: block;
    transition: opacity 0.2s ease;
  }

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

  &:hover img {
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
`;

export const Price = styled.span`
  flex-shrink: 0;
  text-align: right;
`;