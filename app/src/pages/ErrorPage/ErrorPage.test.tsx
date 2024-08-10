import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorPage } from './ErrorPage.tsx';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    useNavigate: () => mockUseNavigate,
  };
});

describe('ErrorPage Component', () => {
  test('renders error message and button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(getByText('404 | Page not found')).toBeInTheDocument();
    expect(getByText('Back home')).toBeInTheDocument();
  });

  test('navigates to home on button click', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const button = getByText('Back home');
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledWith('/');
  });
});
