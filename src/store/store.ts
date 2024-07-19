import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './api/characters-api.ts';
import charactersReducer from './slices/characters-slice.ts';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
