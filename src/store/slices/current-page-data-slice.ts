import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, Data, Info } from '../../types';

type CurrentPageDataState = {
  info: Info;
  results: Character[];
  searchQuery: string;
  currentPage: number;
};

const initialState: CurrentPageDataState = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
  searchQuery: localStorage.getItem('searchQuery') || '',
  currentPage: 1,
};

const currentPageDataSlice = createSlice({
  name: 'currentPageData',
  initialState,
  reducers: {
    setCurrentPageData: (state, action: PayloadAction<Data>) => {
      state.info = action.payload.info;
      state.results = action.payload.results;
    },
    setCurrentPageNumber: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  selectors: {
    currentPageInfoSelector: (state) => state.info,
    currentPageDataSelector: (state) => state,
  },
});

export const { setCurrentPageData, setCurrentPageNumber, setSearchQuery } =
  currentPageDataSlice.actions;

export default currentPageDataSlice.reducer;

export const { currentPageDataSelector, currentPageInfoSelector } =
  currentPageDataSlice.selectors;
