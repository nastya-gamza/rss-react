import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { useThemeContext } from '../../context/theme/useThemeContext';

jest.mock('../../context/theme/useThemeContext.ts', () => ({
  useThemeContext: jest.fn(),
}));

describe('ThemeToggle component', () => {
  const mockToggleTheme = jest.fn();
  const renderComponent = (theme: 'light' | 'dark') => {
    (useThemeContext as jest.Mock).mockReturnValue({
      theme,
      toggleTheme: mockToggleTheme,
    });
    render(<ThemeToggle />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders light theme correctly', () => {
    renderComponent('light');

    const toggleDiv = screen.getByRole('button').querySelector('div');
    expect(toggleDiv).toHaveClass('toggle light');
  });

  test('renders dark theme correctly', () => {
    renderComponent('dark');

    const toggleDiv = screen.getByRole('button').querySelector('div');
    expect(toggleDiv).toHaveClass('toggle dark');
  });

  test('calls toggleTheme when button is clicked', () => {
    renderComponent('light');

    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
