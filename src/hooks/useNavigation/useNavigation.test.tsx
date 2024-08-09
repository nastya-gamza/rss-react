import { useRouter } from 'next/router';
import { useNavigation } from './useNavigation';
import { act, renderHook } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useNavigation Hook', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      pathname: '/',
      push,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return default values', () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.handleNavigate).toBeInstanceOf(Function);
    expect(result.current.handleCurrentPage).toBeInstanceOf(Function);
    expect(result.current.handleNavigateToCharacter).toBeInstanceOf(Function);
  });

  test('handleCurrentPage should push correct URL', () => {
    const { result } = renderHook(() => useNavigation());
    const page = 2;

    act(() => {
      result.current.handleCurrentPage(page);
    });

    expect(push).toHaveBeenCalledWith(`?page=${page}&name=`);
  });

  test('handleNavigate should push correct URL if character query exists', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { character: '1' },
      pathname: '/',
      push,
    });

    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.handleNavigate();
    });

    expect(push).toHaveBeenCalledWith(`?page=1&name=`);
  });

  test('handleNavigateToCharacter should push correct URL if character query does not exist', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      pathname: '/',
      push,
    });

    const { result } = renderHook(() => useNavigation());
    const characterId = 3;

    act(() => {
      result.current.handleNavigateToCharacter(characterId);
    });

    expect(push).toHaveBeenCalledWith(`?page=1&name=&character=${characterId}`);
  });

  test('handleNavigate should not push URL if character query does not exist', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      pathname: '/',
      push,
    });

    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.handleNavigate();
    });

    expect(push).not.toHaveBeenCalled();
  });
});
