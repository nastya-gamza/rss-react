import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Character, Data, Info } from '../../types';

type CurrentPageDataState = {
  info: Info | null;
  results: Character[] | [];
  currentPage: number;
};

const initialState: CurrentPageDataState = {
  info: null,
  results: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: unknown) => {
      if (!action.payload.currentPageData.results.length) {
        return state;
      }
      return {
        ...state,
        ...action.payload.currentPageData,
      };
    });
  },
  selectors: {
    currentPageInfoSelector: (state) => state.info,
    currentPageDataSelector: (state) => state,
  },
});

export const { setCurrentPageData, setCurrentPageNumber } =
  currentPageDataSlice.actions;

export default currentPageDataSlice.reducer;

export const { currentPageDataSelector, currentPageInfoSelector } =
  currentPageDataSlice.selectors;
