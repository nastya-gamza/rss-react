import { useNavigation } from './useNavigation';
import { useLocation, useSearchParams } from '@remix-run/react';
import { act, renderHook } from '@testing-library/react';

jest.mock('@remix-run/react', () => ({
  useLocation: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useNavigation Hook', () => {
  const useLocationMock = useLocation as jest.Mock;
  const useSearchParamsMock = useSearchParams as jest.Mock;

  beforeEach(() => {
    useLocationMock.mockReset();
    useSearchParamsMock.mockReset();
  });

  it('should return default values when no search parameters are set', () => {
    useLocationMock.mockReturnValue({ pathname: '/' });
    useSearchParamsMock.mockReturnValue([new URLSearchParams(), jest.fn()]);

    const { result } = renderHook(() => useNavigation());

    expect(result.current.name).toBe('');
    expect(result.current.currentPage).toBe('1');
    expect(result.current.searchParams.toString()).toBe('');
  });

  it('should return correct values when search parameters are set', () => {
    const searchParams = new URLSearchParams({ page: '2', name: 'Rick' });
    useLocationMock.mockReturnValue({ pathname: '/' });
    useSearchParamsMock.mockReturnValue([searchParams, jest.fn()]);

    const { result } = renderHook(() => useNavigation());

    expect(result.current.name).toBe('Rick');
    expect(result.current.currentPage).toBe('2');
  });

  it('should call setSearchParams with correct parameters in handleCurrentPage', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams({ page: '1', name: 'Rick' });
    useLocationMock.mockReturnValue({ pathname: '/' });
    useSearchParamsMock.mockReturnValue([searchParams, setSearchParams]);

    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.handleCurrentPage(3);
    });

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3', name: 'Rick' });
  });

  it('should not call setSearchParams in handleCurrentPage if pathname is not "/"', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams({ page: '1', name: 'Rick' });
    useLocationMock.mockReturnValue({ pathname: '/other' });
    useSearchParamsMock.mockReturnValue([searchParams, setSearchParams]);

    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.handleCurrentPage(3);
    });

    expect(setSearchParams).not.toHaveBeenCalled();
  });
});
