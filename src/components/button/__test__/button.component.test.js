import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Button, { BUTTON_TYPE_CLASSES } from '../button.component';

describe('button tests', () => {
  test('should render base button when nothing is passed', async () => {
    render(<Button />);
    const baseElement = screen.getByRole('button');
    fireEvent.mouseOver(baseElement);
    await waitFor(() => baseElement);
    
    expect(baseElement).toHaveStyle('background-color: white');
    expect(baseElement).not.toBeDisabled();
  });

  test('should render google button when passed google type', async () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);
    const googleButton = screen.getByRole('button');
    fireEvent.mouseOver(googleButton);
    await waitFor(() => googleButton);

    expect(googleButton).toHaveStyle('background-color: #357ae8');
  });

  test('should render inverted button when passed inverted type', async () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);
    const invertedButton = screen.getByRole('button');
    fireEvent.mouseOver(invertedButton);
    await waitFor(() => invertedButton);

    expect(invertedButton).toHaveStyle('background-color: black');
  });

test('should be disabled if isLoading is true', () => {
    render(<Button isLoading={true}>Test</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
    });
});