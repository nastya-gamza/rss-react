import { usePagination } from './usePagination.ts';
import { renderHook, act } from '@testing-library/react';

describe('USEPAGINATION_HOOK TEST', () => {
  const handleCurrentPageMock = jest.fn();

  beforeEach(() => {
    handleCurrentPageMock.mockClear();
  });

  it('should return the correct pagination range for initial pages', () => {
    const { result } = renderHook(() => usePagination(1, 10, handleCurrentPageMock));

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should return the correct pagination range for middle pages', () => {
    const { result } = renderHook(() => usePagination(5, 10, handleCurrentPageMock));

    expect(result.current.arrayOfPagesNumber).toEqual([2, 3, 4, 5, 6, 7, 8]);
  });

  it('should return the correct pagination range for ending pages', () => {
    const { result } = renderHook(() => usePagination(10, 10, handleCurrentPageMock));

    expect(result.current.arrayOfPagesNumber).toEqual([4, 5, 6, 7, 8, 9, 10]);
  });

  it('should handle small number of total pages', () => {
    const { result } = renderHook(() => usePagination(1, 5, handleCurrentPageMock));

    expect(result.current.arrayOfPagesNumber).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle previous page correctly', () => {
    const { result } = renderHook(() => usePagination(5, 10, handleCurrentPageMock));

    act(() => {
      result.current.handlePrevPage();
    });

    expect(handleCurrentPageMock).toHaveBeenCalledWith(4);
  });

  it('should handle next page correctly', () => {
    const { result } = renderHook(() => usePagination(5, 10, handleCurrentPageMock));

    act(() => {
      result.current.handleNextPage();
    });

    expect(handleCurrentPageMock).toHaveBeenCalledWith(6);
  });

  it('should not go below page 1', () => {
    const { result } = renderHook(() => usePagination(1, 10, handleCurrentPageMock));

    act(() => {
      result.current.handlePrevPage();
    });

    expect(handleCurrentPageMock).toHaveBeenCalledWith(0);
  });

  it('should not go above the last page', () => {
    const { result } = renderHook(() => usePagination(10, 10, handleCurrentPageMock));

    act(() => {
      result.current.handleNextPage();
    });

    expect(handleCurrentPageMock).toHaveBeenCalledWith(11);
  });
});
