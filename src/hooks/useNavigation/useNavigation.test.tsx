import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useNavigation } from './useNavigation';
import { act, renderHook } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useNavigation', () => {
  const mockNavigate = jest.fn();
  const mockUseLocation = { pathname: '/test' };
  const mockSearchParams = new URLSearchParams('?page=2');

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockUseLocation);
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return the correct page and pathname', () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.page).toBe(2);
    expect(result.current.pathname).toBe('/test');
  });

  test('handleNavigate should navigate to the correct URL', () => {
    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.handleNavigate();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  test('handleNavigate should not navigate if pathname is "/"', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.handleNavigate();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('should handle page as null if no page param exists', () => {
    const mockEmptySearchParams = new URLSearchParams('');

    (useSearchParams as jest.Mock).mockReturnValue([mockEmptySearchParams]);

    const { result } = renderHook(() => useNavigation());

    expect(result.current.page).toBeNull();
  });
});
