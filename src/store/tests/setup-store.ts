import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { charactersApi } from '../api/characters-api.ts';
import checkedCharactersReducer from '../slices/checked-characters-slice.ts';
import currentPageReducer from '../slices/current-page-data-slice.ts';
import selectedCharacterReducer from '../slices/selected-character-sice.ts';

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
