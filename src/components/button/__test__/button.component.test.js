import { render, screen } from '@testing-library/react';
import Button, { BUTTON_TYPE_CLASSES } from '../button.component';
import 'jest-styled-components';

describe('button tests', () => {
  test('should render base button when nothing is passed', () => {
    render(<Button />);
    const baseButton = screen.getByRole('button');

    expect(baseButton).toHaveStyleRule('background-color: black');
    expect(baseButton).not.toBeDisabled();
  });

  test('should render google button when passed google type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);
    const googleButton = screen.getByRole('button');

    expect(googleButton).toHaveStyleRule('background-color: #4285f4');
  });

  test('should render inverted button when passed inverted type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);
    const invertedButton = screen.getByRole('button');

    expect(invertedButton).toHaveStyleRule('background-color: white');
  });

  test('should be disabled if isLoading is true', () => {
    render(<Button isLoading={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});