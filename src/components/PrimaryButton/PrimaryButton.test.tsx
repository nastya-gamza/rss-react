import { render, screen, fireEvent } from '@testing-library/react';
import { PrimaryButton } from './PrimaryButton';

describe('PrimaryButton Component', () => {
  test('renders button with text', () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct CSS class', () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('btn');
  });
});
