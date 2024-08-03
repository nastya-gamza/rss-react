import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './api/charactersApi.ts';
import checkedCharactersReducer from './slices/checkedCharactersSlice.ts';
import currentPageReducer from './slices/currentPageDataSlice.ts';
import selectedCharacterReducer from './slices/selectedCharacterSice.ts';

const makeStore = () =>
  configureStore({
    reducer: {
      selectedCharacter: selectedCharacterReducer,
      checkedCharacters: checkedCharactersReducer,
      currentPageData: currentPageReducer,
      [charactersApi.reducerPath]: charactersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
