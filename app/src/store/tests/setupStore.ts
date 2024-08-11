import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkedCharactersReducer from '../slices/checkedCharactersSlice';

const rootReducer = combineReducers({
  checkedCharacters: checkedCharactersReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
