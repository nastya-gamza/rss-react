import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent } from 'react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

type SearchInputProps = {
  defaultValue: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

jest.mock('../SearchInput', () => ({
  SearchInput: ({
    defaultValue,
    handleInputChange,
    handleSubmit,
  }: SearchInputProps) => (
    <form onSubmit={handleSubmit}>
      <input
        defaultValue={defaultValue}
        onChange={handleInputChange}
        data-testid='search-input'
      />
      <button type='submit'>Submit</button>
    </form>
  ),
}));

jest.mock('../ThemeToggle', () => ({
  ThemeToggle: () => <button>Toggle Theme</button>,
}));

describe('Header Component', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
      pathname: '/',
      query: { name: '' },
    }));
  });

  test('renders Header and interacts with form', () => {
    render(<Header />);

    const input = screen.getByTestId('search-input');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: 'test query' } });

    fireEvent.click(submitButton);

    expect(localStorage.getItem('searchQuery')).toBe('test query');

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 1, name: 'test query' },
    });
  });

  test('renders theme toggle button', () => {
    render(<Header />);

    const themeToggleButton = screen.getByText('Toggle Theme');
    expect(themeToggleButton).toBeInTheDocument();
  });
});
