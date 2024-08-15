import { configureStore } from '@reduxjs/toolkit';
import submittedDataReducer from './slices/submittedData.ts';

export const store = configureStore({
  reducer: {
    submittedData: submittedDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
