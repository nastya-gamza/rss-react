import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { ThemeContext } from '../../context/theme/themeContext.ts';
import { ReactNode } from 'react';

jest.mock('next/router', () => require('next-router-mock'));

const MockThemeProvider = ({ children }: { children: ReactNode }) => {
  const toggleTheme = jest.fn();

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

describe('LAYOUT TEST', () => {
  test('renders children correctly', () => {
    render(
      <MockThemeProvider>
        <Layout>
          <div data-testid='child'>Child Component</div>
        </Layout>
      </MockThemeProvider>,
    );

    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child Component');
  });

  test('applies theme class from context', () => {
    render(
      <MockThemeProvider>
        <Layout>
          <div>Content</div>
        </Layout>
      </MockThemeProvider>,
    );

    const layoutWrapper = screen.getByTestId('dark');
    expect(layoutWrapper).toHaveAttribute('data-theme', 'dark');
  });

  test('renders Header component', () => {
    render(
      <MockThemeProvider>
        <Layout>
          <div>Content</div>
        </Layout>
      </MockThemeProvider>,
    );

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });
});
