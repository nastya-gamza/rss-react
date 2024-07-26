import { useLocalStorage } from './useLocalStorage';
import { act, renderHook } from '@testing-library/react';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the initial value if there is no item in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('should return the stored value if there is an item in localStorage', () => {
    localStorage.setItem('key', JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    expect(result.current[0]).toBe('storedValue');
  });

  it('should update localStorage when the state changes', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(localStorage.getItem('key')).toBe(JSON.stringify('newValue'));
    expect(result.current[0]).toBe('newValue');
  });
});
