import { configureStore } from '@reduxjs/toolkit';
import submittedDataReducer from './slices/submittedData.ts';
import countriesReducer from './slices/countries.ts';

export const store = configureStore({
  reducer: {
    submittedData: submittedDataReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
