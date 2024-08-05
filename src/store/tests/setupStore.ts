import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkedCharactersReducer from '../slices/checkedCharactersSlice.ts';
import currentPageReducer from '../slices/currentPageDataSlice.ts';

const rootReducer = combineReducers({
  checkedCharacters: checkedCharactersReducer,
  currentPageData: currentPageReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
