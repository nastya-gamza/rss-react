import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { charactersApi } from '../api/charactersApi.ts';
import checkedCharactersReducer from '../slices/checkedCharactersSlice.ts';
import currentPageReducer from '../slices/currentPageDataSlice.ts';
import selectedCharacterReducer from '../slices/selectedCharacterSice.ts';

const rootReducer = combineReducers({
  selectedCharacter: selectedCharacterReducer,
  checkedCharacters: checkedCharactersReducer,
  currentPageData: currentPageReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
