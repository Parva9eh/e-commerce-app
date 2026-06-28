export const theme = {
  colors: {
    text: '#1a1a1a',
    textMuted: '#4a4a4a',
    textSubtle: '#6b6b6b',
    border: '#2d2d2d',
    borderLight: '#a9a9a9',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#e74c3c',
    google: '#4285f4',
    googleHover: '#357ae8',
    spinnerTrack: 'rgba(195, 195, 195, 0.6)',
    spinnerAccent: '#636767',
  },
  fonts: {
    primary: 'var(--font-open-sans-condensed), sans-serif',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    body: '16px',
    md: '18px',
    lg: '22px',
    xl: '28px',
    xxl: '38px',
    display: '36px',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  letterSpacing: {
    nav: '0.5px',
    button: '0.5px',
  },
  breakpoints: {
    tablet: '800px',
    mobile: '400px',
  },
  spacing: {
    pageDesktop: '20px 40px',
    pageMobile: '10px',
    section: '30px',
  },
  layout: {
    maxWidth: '1400px',
  },
  shadows: {
    dropdown: '0 4px 12px rgba(0, 0, 0, 0.15)',
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  zIndex: {
    dropdown: 10,
  },
  focusRing: {
    width: '2px',
    color: '#1a1a1a',
    offset: '2px',
  },
} as const;

export type AppTheme = typeof theme;

export const media = {
  tablet: `@media screen and (max-width: ${theme.breakpoints.tablet})`,
  mobile: `@media screen and (max-width: ${theme.breakpoints.mobile})`,
};