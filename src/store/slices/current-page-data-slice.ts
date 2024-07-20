import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../../types';

const initialState: Data = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};

const currentPageDataSlice = createSlice({
  name: 'currentPageData',
  initialState,
  reducers: {
    setCurrentPageData: (state, action: PayloadAction<Data>) => {
      state.info = action.payload.info;
      state.results = action.payload.results;
    },
  },
});

export const { setCurrentPageData } = currentPageDataSlice.actions;

export default currentPageDataSlice.reducer;
