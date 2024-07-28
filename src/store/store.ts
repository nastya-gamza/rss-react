import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './api/charactersApi.ts';
import checkedCharactersReducer from './slices/checkedCharactersSlice.ts';
import currentPageReducer from './slices/currentPageDataSlice.ts';
import selectedCharacterReducer from './slices/selectedCharacterSice.ts';

export const store = configureStore({
  reducer: {
    selectedCharacter: selectedCharacterReducer,
    checkedCharacters: checkedCharactersReducer,
    currentPageData: currentPageReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
