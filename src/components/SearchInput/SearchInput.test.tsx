import { fireEvent, render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput.tsx';

const handleClick = jest.fn();
const handleInputChange = jest.fn();

describe('SEARCH_INPUT TEST', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('renders search input', () => {
    render(
      <SearchInput searchQuery={''} handleClick={handleClick} setSearchQuery={handleInputChange} />,
    );

    expect(screen.getByPlaceholderText(/search by name.../i)).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    const setSearchQuery = jest.fn();
    const handleClick = jest.fn();
    const searchQuery = '';

    render(
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleClick={handleClick}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/search by name.../i);

    fireEvent.change(inputElement, { target: { value: 'Rick' } });

    expect(setSearchQuery).toHaveBeenCalledWith('Rick');
  });

  test('clicking Search button saves the entered value to local storage', () => {
    const setSearchQuery = jest.fn();
    const handleClick = jest.fn(() => {
      localStorage.setItem('searchQuery', 'test');
    });

    render(
      <SearchInput searchQuery='' setSearchQuery={setSearchQuery} handleClick={handleClick} />,
    );

    const inputElement = screen.getByPlaceholderText(/search by name.../i);
    const buttonElement = screen.getByTestId('search-btn');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalled();
    expect(localStorage.getItem('searchQuery')).toBe('test');
  });

  test('should retrieve the value from local storage upon mounting', () => {
    const setSearchQuery = jest.fn();
    const handleClick = jest.fn();
    const storedValue = 'stored search';
    localStorage.setItem('searchQuery', storedValue);

    render(
      <SearchInput
        searchQuery={storedValue || ''}
        setSearchQuery={setSearchQuery}
        handleClick={handleClick}
      />,
    );

    const inputElement: HTMLInputElement = screen.getByPlaceholderText(/search by name.../i);
    expect(inputElement.value).toBe(storedValue);
  });
});
