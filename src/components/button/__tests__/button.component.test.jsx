import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Button, { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import { theme } from '@/styles/theme';
import 'jest-styled-components';

const renderButton = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>
  );

describe('button tests', () => {
  test('should render base button when nothing is passed', () => {
    renderButton();
    const baseButton = screen.getByRole('button');

    expect(baseButton).toHaveStyleRule('background-color', theme.colors.text);
    expect(baseButton).not.toBeDisabled();
  });

  test('should render google button when passed google type', () => {
    renderButton({ buttonType: BUTTON_TYPE_CLASSES.google });
    const googleButton = screen.getByRole('button');

    expect(googleButton).toHaveStyleRule('background-color', theme.colors.google);
  });

  test('should render inverted button when passed inverted type', () => {
    renderButton({ buttonType: BUTTON_TYPE_CLASSES.inverted });
    const invertedButton = screen.getByRole('button');

    expect(invertedButton).toHaveStyleRule('background-color', theme.colors.background);
  });

  test('should be disabled if isLoading is true', () => {
    renderButton({ isLoading: true });

    expect(screen.getByRole('button')).toBeDisabled();
  });
});