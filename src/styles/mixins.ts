import { css } from 'styled-components';

export const focusVisible = css`
  &:focus-visible {
    outline: ${({ theme }) => theme.focusRing.width} solid ${({ theme }) => theme.focusRing.color};
    outline-offset: ${({ theme }) => theme.focusRing.offset};
  }
`;