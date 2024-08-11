import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader component', () => {
  test('renders the Loader component', () => {
    render(<Loader />);

    const loaderWrapper = screen.getByTestId('loader');
    expect(loaderWrapper).toBeInTheDocument();
    expect(loaderWrapper).toHaveClass('wrapper');

    const loader = screen.getByTestId('loader').firstChild;
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('loader');
  });
});
