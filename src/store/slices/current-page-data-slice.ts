import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, Data, Info } from '../../types';
import { getItemFromLocalStorage } from '../../utils';

type CurrentPageDataState = {
  info: Info;
  results: Character[];
  query: string;
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
  query: getItemFromLocalStorage('searchQuery') || '',
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
      state.query = action.payload;
    },
  },
});

export const { setCurrentPageData, setCurrentPageNumber, setSearchQuery } =
  currentPageDataSlice.actions;

export default currentPageDataSlice.reducer;
