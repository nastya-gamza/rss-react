import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput component', () => {
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockHandleInputChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders SearchInput component with default value', () => {
    render(
      <SearchInput
        defaultValue='test'
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
      />,
    );

    const inputElement = screen.getByPlaceholderText('Search by name...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('test');
  });

  test('calls handleInputChange when input value is changed', () => {
    render(
      <SearchInput
        defaultValue=''
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
      />,
    );

    const inputElement = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(inputElement, { target: { value: 'Rick' } });

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
  });

  test('renders the search button', () => {
    render(
      <SearchInput
        defaultValue=''
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
      />,
    );

    const buttonElement = screen.getByTestId('search-btn');
    expect(buttonElement).toBeInTheDocument();
  });
});
