import { render, screen, fireEvent } from '@testing-library/react';
import { Error } from '../Error';

jest.mock('../PrimaryButton', () => ({
  PrimaryButton: ({
    onClick,
    children,
  }: {
    onClick?: () => void;
    children?: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

describe('Error Component', () => {
  test('renders error message without button', () => {
    render(<Error message='An error occurred' />);

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'An error occurred',
    );
    expect(screen.queryByText('Retry')).not.toBeInTheDocument();
  });

  test('renders error message with button', () => {
    const handleRefresh = jest.fn();
    render(
      <Error
        message='An error occurred'
        btnText='Retry'
        handleRefresh={handleRefresh}
      />,
    );

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'An error occurred',
    );
    expect(screen.getByText('Retry')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Retry'));
    expect(handleRefresh).toHaveBeenCalledTimes(1);
  });
});
