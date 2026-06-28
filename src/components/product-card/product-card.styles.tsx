import styled from 'styled-components';
import { media } from '@/styles/theme';

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
    transition: opacity 0.2s ease;
  }

  button {
    width: 80%;
    opacity: 0.9;
    position: absolute;
    top: 255px;
    display: flex;
  }

  &:hover img {
    opacity: 0.85;
  }

  ${media.tablet} {
    width: 40vw;

    button {
      min-width: unset;
      padding: 0 10px;
    }
  }

  ${media.mobile} {
    width: 80vw;
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const Price = styled.span`
  width: 10%;
  white-space: nowrap;
`;