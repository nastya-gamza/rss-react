import { act, renderHook } from '@testing-library/react';
import { useSearchQuery } from './useSearchQuery.ts';

describe('useSearchQuery', () => {
  it('should set initial search query from local storage', () => {
    const key = 'mySearchQuery';
    const initialValue = 'initial value from local storage';
    localStorage.setItem(key, initialValue);

    const { result } = renderHook(() => useSearchQuery(key));

    expect(result.current[0]).toBe(initialValue);
  });

  it('should update search query when setSearchQuery is called', () => {
    const key = 'mySearchQuery';
    const { result } = renderHook(() => useSearchQuery(key));
    const newSearchQuery = 'new search query';

    act(() => {
      result.current[1](newSearchQuery);
    });

    expect(result.current[0]).toBe(newSearchQuery);
  });
});
