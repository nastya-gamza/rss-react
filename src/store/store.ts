import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './api/characters-api.ts';
import selectedCharactersReducer from './slices/selected-characters-slice.ts';
import currentPageReducer from './slices/current-page-data-slice.ts';

export const store = configureStore({
  reducer: {
    selectedCharacters: selectedCharactersReducer,
    currentPage: currentPageReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
