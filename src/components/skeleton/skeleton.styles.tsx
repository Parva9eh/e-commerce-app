import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const SkeletonBlock = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${({ $height }) => $height ?? '20px'};
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.spinnerTrack} 0px,
    #f0f0f0 40px,
    ${({ theme }) => theme.colors.spinnerTrack} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;