import { usePagination } from './usePagination';
import * as reduxHooks from '../../hooks/useRedux/useRedux.ts';
import { generatePageArray } from '../../utils';
import { act, renderHook } from '@testing-library/react';

jest.mock('../../store/slices/currentPageDataSlice.ts', () => ({
  currentPageInfoSelector: jest.fn(),
}));
jest.mock('../../utils', () => ({
  generatePageArray: jest.fn((start, end) =>
    Array.from({ length: end - start }, (_, i) => start + i),
  ),
}));

describe('usePagination', () => {
  const mockUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');
  const mockGeneratePageArray = generatePageArray as jest.Mock;
  const handleCurrentPage = jest.fn();
  const totalPages = 42;

  beforeEach(() => {
    mockUseAppSelector.mockClear();
    mockGeneratePageArray.mockClear();
  });

  test('should handle case where totalPages is less than PAGINATION_PAGE_QUANTITY', () => {
    mockUseAppSelector.mockReturnValue({ pages: 5 });

    const { result } = renderHook(() =>
      usePagination(2, totalPages, handleCurrentPage),
    );

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5]);
    expect(result.current.totalPages).toBe(5);
  });

  test('should handle case where currentPage is at the beginning of the range', () => {
    mockUseAppSelector.mockReturnValue({ pages: 10 });

    const { result } = renderHook(() =>
      usePagination(2, totalPages, handleCurrentPage),
    );

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(result.current.totalPages).toBe(10);
  });

  test('should handle case where currentPage is at the end of the range', () => {
    mockUseAppSelector.mockReturnValue({ pages: 10 });

    const { result } = renderHook(() =>
      usePagination(9, totalPages, handleCurrentPage),
    );

    expect(result.current.arrayOfPagesNumber).toEqual([4, 5, 6, 7, 8, 9, 10]);
    expect(result.current.totalPages).toBe(10);
  });

  test('should handle case where currentPage is in the middle of the range', () => {
    mockUseAppSelector.mockReturnValue({ pages: 20 });

    const { result } = renderHook(() =>
      usePagination(10, totalPages, handleCurrentPage),
    );

    expect(result.current.arrayOfPagesNumber).toEqual([
      7, 8, 9, 10, 11, 12, 13,
    ]);
    expect(result.current.totalPages).toBe(20);
  });

  test('should call handleCurrentPage with previous page on handlePrevPage', () => {
    mockUseAppSelector.mockReturnValue({ pages: 20 });

    const { result } = renderHook(() =>
      usePagination(10, totalPages, handleCurrentPage),
    );

    act(() => {
      result.current.handlePrevPage();
    });

    expect(handleCurrentPage).toHaveBeenCalledWith(9);
  });

  test('should call handleCurrentPage with next page on handleNextPage', () => {
    mockUseAppSelector.mockReturnValue({ pages: 20 });

    const { result } = renderHook(() =>
      usePagination(10, totalPages, handleCurrentPage),
    );

    act(() => {
      result.current.handleNextPage();
    });

    expect(handleCurrentPage).toHaveBeenCalledWith(11);
  });
});
