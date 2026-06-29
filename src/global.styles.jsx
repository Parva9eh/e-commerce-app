import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing.pageDesktop};
    -webkit-font-smoothing: antialiased;

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: ${({ theme }) => theme.spacing.pageMobile};
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: clamp(1.75rem, 5vw, ${({ theme }) => theme.fontSizes.xxl});
  }

  h2 {
    font-size: clamp(1.25rem, 3.5vw, ${({ theme }) => theme.fontSizes.xl});
  }

  h3 {
    font-size: clamp(1.125rem, 3vw, ${({ theme }) => theme.fontSizes.lg});
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.heading};
  }
`;