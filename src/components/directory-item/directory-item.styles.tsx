import styled from 'styled-components';
import { focusVisible } from '@/styles/mixins';
import { media } from '@/styles/theme';

export const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;

  img {
    object-fit: cover;
    transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;

export const Body = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  opacity: 0.85;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  h2 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: 0 6px 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
  }

  p {
    font-weight: ${({ theme }) => theme.fontWeights.light};
    font-size: ${({ theme }) => theme.fontSizes.body};
    margin: 0;
  }
`;

export const DirectoryItemContainer = styled.button`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0 7.5px 15px;
  overflow: hidden;
  padding: 0;
  background: none;
  cursor: pointer;
  position: relative;

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  &:hover {
    ${BackgroundImage} img {
      transform: scale(1.1);
    }

    ${Body} {
      opacity: 0.95;
    }
  }

  ${focusVisible}

  ${media.tablet} {
    height: 200px;
  }
`;