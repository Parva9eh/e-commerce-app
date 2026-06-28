import styled from 'styled-components';
import Link from 'next/link';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  ${media.tablet} {
    align-items: center;
  }
`;

export const Title = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: 25px;
  cursor: pointer;

  ${focusVisible}
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 15px;
    row-gap: 25px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    row-gap: 25px;
  }
`;