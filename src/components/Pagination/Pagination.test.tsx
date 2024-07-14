import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from './Pagination';
import { usePagination } from '../../hooks';

jest.mock('../../hooks/usePagination/usePagination.ts');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PAGINATION TEST', () => {
  const handleCurrentPage = jest.fn();

  beforeEach(() => {
    (usePagination as jest.Mock).mockReturnValue({
      arrayOfPagesNumber: [1, 2, 3, 4, 5, 6, 7],
      handlePrevPage: jest.fn(),
      handleNextPage: jest.fn(),
    });
  });

  it('renders pagination buttons correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Pagination currentPage={3} totalPages={10} handleCurrentPage={handleCurrentPage} />
      </MemoryRouter>,
    );

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    for (let i = 1; i <= 7; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('calls handleCurrentPage with correct page number', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Pagination currentPage={3} totalPages={10} handleCurrentPage={handleCurrentPage} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('4'));
    expect(handleCurrentPage).toHaveBeenCalledWith(4);
  });
});
