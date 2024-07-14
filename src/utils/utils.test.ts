import { getItemFromLocalStorage, setItemToLocalStorage } from './index.ts';

describe('localStorageUtils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should retrieve an item from local storage', () => {
    localStorage.setItem('testItem', 'testValue');
    const result = getItemFromLocalStorage('testItem');
    expect(result).toBe('testValue');
  });

  test('should return an empty string if the item does not exist in local storage', () => {
    const result = getItemFromLocalStorage('nonExistentItem');
    expect(result).toBe('');
  });

  test('should set an item in local storage', () => {
    setItemToLocalStorage('testKey', 'testValue');
    expect(localStorage.getItem('testKey')).toBe('testValue');
  });
});
