import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pagination } from './Pagination';
import { usePagination } from '../../hooks/usePagination';

jest.mock('../../hooks/usePagination');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pagination component', () => {
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

  // it('updates the URL query parameter when page changes', () => {
  //   const TestComponent = () => {
  //     const location = useLocation();
  //     return (
  //       <>
  //         <Pagination currentPage={3} totalPages={10} handleCurrentPage={handleCurrentPage} />
  //         <div data-testid='location-display'>{location.search}</div>
  //       </>
  //     );
  //   };
  //
  //   render(
  //     <MemoryRouter initialEntries={['/?page=3']}>
  //       <Routes>
  //         <Route path='/' element={<TestComponent />} />
  //       </Routes>
  //     </MemoryRouter>,
  //   );
  //
  //   fireEvent.click(screen.getByText('4'));
  //   expect(handleCurrentPage).toHaveBeenCalledWith(4);
  //
  //   fireEvent.click(screen.getByText('5'));
  //   expect(handleCurrentPage).toHaveBeenCalledWith(5);
  // });

  // it('navigates to SecondaryPage when button is clicked', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Pagination currentPage={3} totalPages={10} handleCurrentPage={handleCurrentPage} />
  //     </MemoryRouter>,
  //   );
  //
  //   userEvent.click(screen.getByText('4'));
  //   expect(mockNavigate).toHaveBeenNthCalledWith(1, '/?page=4');
  // });
});
