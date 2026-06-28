import styled from 'styled-components';
import { media } from '@/styles/theme';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 25px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: 25px;
  text-align: center;
`;