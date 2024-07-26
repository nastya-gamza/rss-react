import { createContext } from 'react';

type Theme = 'dark' | 'light';

export type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
};

const defaultThemeContextValue: ThemeContextProps = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextProps>(
  defaultThemeContextValue,
);
