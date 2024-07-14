import { renderHook } from '@testing-library/react';
import { useNavigation } from './useNavigation.ts';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate when handleNavigate is called', () => {
    const mockNavigate = jest.fn();
    const mockLocation = { pathname: '/some-path' };
    const mockSearchParams = new URLSearchParams('?page=2');

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    const { result } = renderHook(() => useNavigation());

    result.current.handleNavigate();

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('should not update currentPage or navigate when handleCurrentPage is called on non-root path', () => {
    const mockNavigate = jest.fn();
    const mockLocation = { pathname: '/some-path' };
    const mockSearchParams = new URLSearchParams('?page=1');

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    const { result } = renderHook(() => useNavigation());

    result.current.handleCurrentPage(5);

    expect(result.current.currentPage).toBe(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
