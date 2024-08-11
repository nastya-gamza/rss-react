import { renderHook } from '@testing-library/react';
import { usePagination } from './usePagination';
import { useNavigation } from '../useNavigation';
import { generatePageArray } from '../../utils';

jest.mock('../useNavigation', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../utils', () => ({
  generatePageArray: jest.fn(),
}));

describe('usePagination hook', () => {
  const mockHandleCurrentPage = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      currentPage: 1,
      handleCurrentPage: mockHandleCurrentPage,
    });

    (generatePageArray as jest.Mock).mockImplementation((start, end) => {
      const array = [];
      for (let i = start; i < end; i++) {
        array.push(i);
      }
      return array;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns correct pagination array when total pages are less than PAGINATION_PAGE_QUANTITY', () => {
    const { result } = renderHook(() => usePagination(5));

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5]);
    expect(generatePageArray).toHaveBeenCalledWith(1, 6);
  });

  test('returns correct pagination array when on first page and total pages are more than PAGINATION_PAGE_QUANTITY', () => {
    (useNavigation as jest.Mock).mockReturnValue({
      currentPage: 1,
      handleCurrentPage: mockHandleCurrentPage,
    });

    const { result } = renderHook(() => usePagination(10));

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(generatePageArray).toHaveBeenCalledWith(1, 8);
  });

  test('returns correct pagination array when on a middle page and total pages are more than PAGINATION_PAGE_QUANTITY', () => {
    (useNavigation as jest.Mock).mockReturnValue({
      currentPage: 5,
      handleCurrentPage: mockHandleCurrentPage,
    });

    const { result } = renderHook(() => usePagination(10));

    expect(result.current.arrayOfPagesNumber).toEqual([2, 3, 4, 5, 6, 7, 8]);
    expect(generatePageArray).toHaveBeenCalledWith(2, 9);
  });

  test('returns correct pagination array when on last page and total pages are more than PAGINATION_PAGE_QUANTITY', () => {
    (useNavigation as jest.Mock).mockReturnValue({
      currentPage: 10,
      handleCurrentPage: mockHandleCurrentPage,
    });

    const { result } = renderHook(() => usePagination(10));

    expect(result.current.arrayOfPagesNumber).toEqual([4, 5, 6, 7, 8, 9, 10]);
    expect(generatePageArray).toHaveBeenCalledWith(4, 11);
  });

  test('handlePrevPage and handleNextPage call handleCurrentPage with correct values', () => {
    const { result } = renderHook(() => usePagination(10));

    result.current.handlePrevPage();
    expect(mockHandleCurrentPage).toHaveBeenCalledWith(0);

    result.current.handleNextPage();
    expect(mockHandleCurrentPage).toHaveBeenCalledWith(2);
  });

  test('handles pagination when currentPage is greater than totalPages', () => {
    (useNavigation as jest.Mock).mockReturnValue({
      currentPage: 12,
      handleCurrentPage: mockHandleCurrentPage,
    });

    const { result } = renderHook(() => usePagination(10));

    expect(result.current.arrayOfPagesNumber).toEqual([4, 5, 6, 7, 8, 9, 10]);
    expect(generatePageArray).toHaveBeenCalledWith(4, 11);
  });
});
