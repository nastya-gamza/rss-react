import currentPageDataReducer, {
  setCurrentPageData,
  setCurrentPageNumber,
  currentPageDataSelector,
  currentPageInfoSelector,
} from '../slices/currentPageDataSlice.ts';
import { Data, Info } from '../../types';
import { mockCharacters } from '../../__mocks__/characters.ts';

const initialState = {
  info: null,
  results: [],
  searchQuery: localStorage.getItem('searchQuery') || '',
  currentPage: 1,
};

const mockInfo: Info = {
  count: 100,
  pages: 10,
  next: 'next_url',
  prev: 'prev_url',
};

const mockData: Data = {
  info: mockInfo,
  results: mockCharacters,
};

describe('currentPageData slice', () => {
  test('should return the initial state', () => {
    const result = currentPageDataReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  test('should handle setCurrentPageData', () => {
    const action = { type: setCurrentPageData.type, payload: mockData };
    const result = currentPageDataReducer(initialState, action);

    expect(result.info).toEqual(mockInfo);
    expect(result.results).toEqual(mockCharacters);
  });

  test('should handle setCurrentPageNumber', () => {
    const action = { type: setCurrentPageNumber.type, payload: 2 };
    const result = currentPageDataReducer(initialState, action);

    expect(result.currentPage).toEqual(2);
  });

  test('currentPageDataSelector should return the entire state', () => {
    const state = { currentPageData: initialState };
    expect(currentPageDataSelector(state)).toEqual(initialState);
  });

  test('currentPageInfoSelector should return the info', () => {
    const state = { currentPageData: { ...initialState, info: mockInfo } };
    expect(currentPageInfoSelector(state)).toEqual(mockInfo);
  });
});
