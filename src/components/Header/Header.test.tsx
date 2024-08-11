import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent } from 'react';

type SearchInputProps = {
  defaultValue: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../SearchInput', () => ({
  SearchInput: ({
    defaultValue,
    handleInputChange,
    handleSubmit,
  }: SearchInputProps) => (
    <form onSubmit={handleSubmit}>
      <input
        data-testid='search-input'
        defaultValue={defaultValue}
        onChange={handleInputChange}
      />
      <button type='submit'>Search</button>
    </form>
  ),
}));

jest.mock('../ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid='theme-toggle' />,
}));

describe('Header component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'name' ? 'testName' : null),
    });

    jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the header component with SearchInput and ThemeToggle', () => {
    render(<Header />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('testName');

    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeInTheDocument();
  });

  test('updates inputRef on input change', () => {
    render(<Header />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'newSearch' } });

    expect(searchInput).toHaveValue('newSearch');
  });

  test('handles form submission and redirects to the correct URL', () => {
    render(<Header />);

    const searchInput = screen.getByTestId('search-input');
    const form = searchInput.closest('form');

    fireEvent.change(searchInput, { target: { value: 'newSearch' } });
    fireEvent.submit(form!);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'searchQuery',
      'newSearch',
    );
    expect(mockPush).toHaveBeenCalledWith('/?page=1&name=newSearch');
  });
});
