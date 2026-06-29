import styled from 'styled-components';
import Link from 'next/link';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const CategoryPreviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
`;

export const Title = styled(Link)`
  display: block;
  width: 100%;
  font-size: clamp(1.25rem, 3.5vw, ${({ theme }) => theme.fontSizes.xl});
  margin-bottom: 20px;
  cursor: pointer;
  text-align: left;

  ${focusVisible}
`;

export const Preview = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 20px;
  row-gap: 30px;

  ${media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 16px;
    row-gap: 24px;
  }

  ${media.narrow} {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 28px;
  }
`;