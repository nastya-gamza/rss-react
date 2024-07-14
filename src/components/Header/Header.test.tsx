import { render, screen } from '@testing-library/react';
import { Header } from './Header.tsx';

describe('Header component', () => {
  test('renders children correctly', () => {
    render(<Header>Test Header</Header>);

    const headerElement = screen.getByText('Test Header');
    expect(headerElement).toBeInTheDocument();
  });
});
