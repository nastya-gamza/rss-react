import { renderHook } from '@testing-library/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useNavigation } from './useNavigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useNavigation hook', () => {
  const mockPush = jest.fn();
  const mockPathname = '/';
  const mockSearchParams = new URLSearchParams('?page=1&name=testName');

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns correct currentPage and name values', () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.handleCurrentPage).toBeInstanceOf(Function);
    expect(result.current.handleNavigate).toBeInstanceOf(Function);
    expect(result.current.handleNavigateToCharacter).toBeInstanceOf(Function);
  });

  test('handleCurrentPage navigates to the correct page', () => {
    const { result } = renderHook(() => useNavigation());

    result.current.handleCurrentPage(2);

    expect(mockPush).toHaveBeenCalledWith('?page=2&name=testName');
  });

  test('handleNavigate pushes to the correct URL when character exists', () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('?page=1&name=testName&character=1'),
    );

    const { result } = renderHook(() => useNavigation());

    result.current.handleNavigate();

    expect(mockPush).toHaveBeenCalledWith('?page=1&name=testName');
  });

  test('handleNavigateToCharacter pushes to the correct URL when character does not exist', () => {
    const { result } = renderHook(() => useNavigation());

    result.current.handleNavigateToCharacter(123);

    expect(mockPush).toHaveBeenCalledWith(
      '?page=1&name=testName&character=123',
    );
  });

  test('handleNavigateToCharacter does not push when character already exists', () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('?page=1&name=testName&character=123'),
    );

    const { result } = renderHook(() => useNavigation());

    result.current.handleNavigateToCharacter(123);

    expect(mockPush).not.toHaveBeenCalled();
  });
});
