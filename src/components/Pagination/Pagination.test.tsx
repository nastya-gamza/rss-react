import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

jest.mock('../../hooks', () => ({
  usePagination: (
    currentPage: number,
    handleCurrentPage: (page: number) => void,
  ) => ({
    arrayOfPagesNumber: [1, 2, 3, 4, 5],
    totalPages: 5,
    handlePrevPage: () => handleCurrentPage(currentPage - 1),
    handleNextPage: () => handleCurrentPage(currentPage + 1),
  }),
}));

describe('Pagination component', () => {
  const mockHandleCurrentPage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination component', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={42}
        handleCurrentPage={mockHandleCurrentPage}
      />,
    );

    const paginationButtons = screen.getAllByRole('button');
    expect(paginationButtons).toHaveLength(7);

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

  test('calls handlePrevPage when prev button is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={42}
        handleCurrentPage={mockHandleCurrentPage}
      />,
    );

    const prevButton = screen.getByText('<');
    fireEvent.click(prevButton);

    expect(mockHandleCurrentPage).toHaveBeenCalledWith(2);
  });

  test('calls handleNextPage when next button is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={42}
        handleCurrentPage={mockHandleCurrentPage}
      />,
    );

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    expect(mockHandleCurrentPage).toHaveBeenCalledWith(4);
  });

  test('calls handleCurrentPage when a page button is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={42}
        handleCurrentPage={mockHandleCurrentPage}
      />,
    );

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(mockHandleCurrentPage).toHaveBeenCalledWith(2);
  });

  test('does not render prev button when on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={42}
        handleCurrentPage={mockHandleCurrentPage}
      />,
    );

    const prevButton = screen.queryByText('<');
    expect(prevButton).toBeNull();

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeInTheDocument();
  });

  test('does not render next button when on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={42}
        handleCurrentPage={mockHandleCurrentPage}
      />,
    );

    const nextButton = screen.queryByText('>');
    expect(nextButton).toBeNull();

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeInTheDocument();
  });
});
