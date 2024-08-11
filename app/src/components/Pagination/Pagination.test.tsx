import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  const handleCurrentPageMock = jest.fn();

  beforeEach(() => {
    handleCurrentPageMock.mockClear();
  });

  const renderPagination = (currentPage: number, totalPages: number) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleCurrentPage={handleCurrentPageMock}
      />,
    );
  };

  it('applies the active style to the current page', () => {
    renderPagination(3, 10);
    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveClass('activeBtn');
  });

  it('calls handleCurrentPage when a page button is clicked', () => {
    renderPagination(1, 10);
    const button = screen.getByText('2');
    fireEvent.click(button);
    expect(handleCurrentPageMock).toHaveBeenCalledWith(2);
  });

  it('renders previous and next buttons when applicable', () => {
    renderPagination(5, 10);
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('does not render the previous button on the first page', () => {
    renderPagination(1, 10);
    expect(screen.queryByText('<')).not.toBeInTheDocument();
  });

  it('does not render the next button on the last page', () => {
    renderPagination(10, 10);
    expect(screen.queryByText('>')).not.toBeInTheDocument();
  });

  it('calls handlePrevPage and handleNextPage when arrows are clicked', () => {
    renderPagination(5, 10);
    const prevButton = screen.getByText('<');
    const nextButton = screen.getByText('>');

    fireEvent.click(prevButton);
    expect(handleCurrentPageMock).toHaveBeenCalledWith(4);

    fireEvent.click(nextButton);
    expect(handleCurrentPageMock).toHaveBeenCalledWith(6);
  });
});
