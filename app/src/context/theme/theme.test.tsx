import { ReactNode, useContext } from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import { ThemeContext, ThemeContextProps } from './themeContext';
import { ThemeProvider } from './themeProvider';
import { useThemeContext } from './useThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid='theme'>{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should provide default context values', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
        <TestComponent />
      </ThemeContext.Provider>,
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toBe('light');
  });

  test('should toggle theme when toggleTheme is called', () => {
    const toggleThemeMock = jest.fn();
    const mockContextValue: ThemeContextProps = {
      theme: 'light',
      toggleTheme: toggleThemeMock,
    };

    render(
      <ThemeContext.Provider value={mockContextValue}>
        <TestComponent />
      </ThemeContext.Provider>,
    );

    const button = screen.getByText('Toggle Theme');
    button.click();

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  test('should provide theme context values when used within ThemeProvider', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toBe('light');
  });

  test('should return the context value when used within a ThemeProvider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useThemeContext(), { wrapper });

    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('toggleTheme');
  });

  test('should return the correct default theme', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useThemeContext(), { wrapper });

    expect(result.current.theme).toBe('light');
  });
});
