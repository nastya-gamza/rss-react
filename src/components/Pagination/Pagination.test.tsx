import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { usePagination } from '../../hooks';

jest.mock('../../hooks', () => ({
  usePagination: jest.fn(),
}));

describe('Pagination component', () => {
  const mockHandleCurrentPage = jest.fn();
  const mockHandlePrevPage = jest.fn();
  const mockHandleNextPage = jest.fn();

  beforeEach(() => {
    (usePagination as jest.Mock).mockReturnValue({
      arrayOfPagesNumber: [1, 2, 3, 4, 5],
      handlePrevPage: mockHandlePrevPage,
      handleNextPage: mockHandleNextPage,
      handleCurrentPage: mockHandleCurrentPage,
      currentPage: 3,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination component with correct buttons', () => {
    render(<Pagination totalPages={5} />);

    const paginationButtons = screen.getAllByRole('button');
    expect(paginationButtons).toHaveLength(7); // 5 page buttons + 2 arrow buttons

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeInTheDocument();

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toHaveClass('activeBtn');
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('calls handleCurrentPage when a page button is clicked', () => {
    render(<Pagination totalPages={5} />);

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(mockHandleCurrentPage).toHaveBeenCalledWith(2);
  });

  test('calls handlePrevPage when the prev button is clicked', () => {
    render(<Pagination totalPages={5} />);

    const prevButton = screen.getByText('<');
    fireEvent.click(prevButton);

    expect(mockHandlePrevPage).toHaveBeenCalled();
  });

  test('calls handleNextPage when the next button is clicked', () => {
    render(<Pagination totalPages={5} />);

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    expect(mockHandleNextPage).toHaveBeenCalled();
  });

  test('does not render prev button when on first page', () => {
    (usePagination as jest.Mock).mockReturnValue({
      arrayOfPagesNumber: [1, 2, 3, 4, 5],
      handlePrevPage: mockHandlePrevPage,
      handleNextPage: mockHandleNextPage,
      handleCurrentPage: mockHandleCurrentPage,
      currentPage: 1,
    });

    render(<Pagination totalPages={5} />);

    const prevButton = screen.queryByText('<');
    expect(prevButton).toBeNull();

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeInTheDocument();
  });

  test('does not render next button when on last page', () => {
    (usePagination as jest.Mock).mockReturnValue({
      arrayOfPagesNumber: [1, 2, 3, 4, 5],
      handlePrevPage: mockHandlePrevPage,
      handleNextPage: mockHandleNextPage,
      handleCurrentPage: mockHandleCurrentPage,
      currentPage: 5,
    });

    render(<Pagination totalPages={5} />);

    const nextButton = screen.queryByText('>');
    expect(nextButton).toBeNull();

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeInTheDocument();
  });
});
