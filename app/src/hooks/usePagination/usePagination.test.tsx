import { usePagination } from './usePagination';
import { act, renderHook } from '@testing-library/react';

jest.mock('../../utils', () => ({
  generatePageArray: jest.fn((start, end) =>
    Array.from({ length: end - start }, (_, i) => i + start),
  ),
}));

describe('usePagination Hook', () => {
  it('returns correct pagination range for the first page', () => {
    const { result } = renderHook(() => usePagination(1, 10, jest.fn()));

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns correct pagination range for a middle page', () => {
    const { result } = renderHook(() => usePagination(5, 10, jest.fn()));

    expect(result.current.arrayOfPagesNumber).toEqual([2, 3, 4, 5, 6, 7, 8]);
  });

  it('returns correct pagination range for the last page', () => {
    const { result } = renderHook(() => usePagination(10, 10, jest.fn()));

    expect(result.current.arrayOfPagesNumber).toEqual([4, 5, 6, 7, 8, 9, 10]);
  });

  it('returns correct pagination range when totalPages is less than PAGINATION_PAGE_QUANTITY', () => {
    const { result } = renderHook(() => usePagination(1, 5, jest.fn()));

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5]);
  });

  it('calls handleCurrentPage with the correct page when navigating to the previous page', () => {
    const handleCurrentPage = jest.fn();
    const { result } = renderHook(() =>
      usePagination(5, 10, handleCurrentPage),
    );

    act(() => {
      result.current.handlePrevPage();
    });

    expect(handleCurrentPage).toHaveBeenCalledWith(4);
  });

  it('calls handleCurrentPage with the correct page when navigating to the next page', () => {
    const handleCurrentPage = jest.fn();
    const { result } = renderHook(() =>
      usePagination(5, 10, handleCurrentPage),
    );

    act(() => {
      result.current.handleNextPage();
    });

    expect(handleCurrentPage).toHaveBeenCalledWith(6);
  });

  it('prevents navigating to previous page if on the first page', () => {
    const handleCurrentPage = jest.fn();
    const { result } = renderHook(() =>
      usePagination(1, 10, handleCurrentPage),
    );

    act(() => {
      result.current.handlePrevPage();
    });

    expect(handleCurrentPage).toHaveBeenCalledWith(0);
  });

  it('prevents navigating to next page if on the last page', () => {
    const handleCurrentPage = jest.fn();
    const { result } = renderHook(() =>
      usePagination(10, 10, handleCurrentPage),
    );

    act(() => {
      result.current.handleNextPage();
    });

    expect(handleCurrentPage).toHaveBeenCalledWith(11);
  });
});
