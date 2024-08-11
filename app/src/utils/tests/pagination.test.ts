import { generatePageArray } from '../pagination';

describe('generatePageArray', () => {
  test('generates array from 1 to 5', () => {
    const result = generatePageArray(1, 5);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('generates array from 0 to 3', () => {
    const result = generatePageArray(0, 3);
    expect(result).toEqual([0, 1, 2]);
  });

  test('generates array from 5 to 10', () => {
    const result = generatePageArray(5, 10);
    expect(result).toEqual([5, 6, 7, 8, 9]);
  });

  test('generates empty array when start is equal to end', () => {
    const result = generatePageArray(5, 5);
    expect(result).toEqual([]);
  });
});
