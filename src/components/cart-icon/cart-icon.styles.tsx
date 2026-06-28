import styled from 'styled-components';
import { focusVisible } from '@/styles/mixins';

export const CartIconContainer = styled.button`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  svg {
    width: 24px;
    height: 24px;
  }

  ${focusVisible}
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  bottom: 12px;
`;