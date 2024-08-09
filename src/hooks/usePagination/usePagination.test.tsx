import { usePagination } from './usePagination';
import { generatePageArray } from '../../utils';
import { renderHook } from '@testing-library/react';

jest.mock('../../utils', () => ({
  generatePageArray: jest.fn(),
}));

const handleCurrentPageMock = jest.fn();

describe('usePagination Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle pagination with currentPage in the first half of pages', () => {
    (generatePageArray as jest.Mock).mockReturnValue([1, 2, 3, 4, 5, 6, 7]);

    const { result } = renderHook(() =>
      usePagination(2, 10, handleCurrentPageMock),
    );

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(result.current.handlePrevPage).toBeInstanceOf(Function);
    expect(result.current.handleNextPage).toBeInstanceOf(Function);
  });

  test('should handle pagination with currentPage in the last half of pages', () => {
    (generatePageArray as jest.Mock).mockReturnValue([5, 6, 7, 8, 9, 10]);

    const { result } = renderHook(() =>
      usePagination(8, 10, handleCurrentPageMock),
    );

    expect(result.current.arrayOfPagesNumber).toEqual([5, 6, 7, 8, 9, 10]);
    expect(result.current.handlePrevPage).toBeInstanceOf(Function);
    expect(result.current.handleNextPage).toBeInstanceOf(Function);
  });

  test('should handle pagination with currentPage in the middle of pages', () => {
    (generatePageArray as jest.Mock).mockReturnValue([4, 5, 6, 7, 8]);

    const { result } = renderHook(() =>
      usePagination(6, 10, handleCurrentPageMock),
    );

    expect(result.current.arrayOfPagesNumber).toEqual([4, 5, 6, 7, 8]);
    expect(result.current.handlePrevPage).toBeInstanceOf(Function);
    expect(result.current.handleNextPage).toBeInstanceOf(Function);
  });

  test('handlePrevPage and handleNextPage should call handleCurrentPage with correct arguments', () => {
    const { result } = renderHook(() =>
      usePagination(5, 10, handleCurrentPageMock),
    );

    result.current.handlePrevPage();
    expect(handleCurrentPageMock).toHaveBeenCalledWith(4);

    result.current.handleNextPage();
    expect(handleCurrentPageMock).toHaveBeenCalledWith(6);
  });
});
