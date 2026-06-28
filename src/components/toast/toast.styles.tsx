import { createGlobalStyle } from 'styled-components';

export const ToastStyles = createGlobalStyle`
  .crwn-toast {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.body};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.dropdown};
  }
`;