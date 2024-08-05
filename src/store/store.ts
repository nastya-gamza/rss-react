import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import checkedCharactersReducer from './slices/checkedCharactersSlice.ts';
import currentPageReducer from './slices/currentPageDataSlice.ts';

const makeStore = () =>
  configureStore({
    reducer: {
      checkedCharacters: checkedCharactersReducer,
      currentPageData: currentPageReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
