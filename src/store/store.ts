import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './api/characters-api.ts';
import checkedCharactersReducer from './slices/checked-characters-slice.ts';
import currentPageReducer from './slices/current-page-data-slice.ts';
import selectedCharacterReducer from './slices/selected-character-sice.ts';

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
