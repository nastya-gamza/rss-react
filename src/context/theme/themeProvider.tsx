import { ReactNode, useLayoutEffect } from 'react';
import { ThemeContext } from './themeContext';
import { useLocalStorage } from '../../hooks';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
