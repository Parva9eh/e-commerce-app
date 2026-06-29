import styled from 'styled-components';
import { media } from '@/styles/theme';

export const DirectoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;