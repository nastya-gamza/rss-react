import { configureStore } from '@reduxjs/toolkit';
import checkedCharactersReducer from './slices/checkedCharactersSlice.ts';

export const store = configureStore({
  reducer: {
    checkedCharacters: checkedCharactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
