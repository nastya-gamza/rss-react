import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, Data } from '../../types';

const initialState: Data = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.results = action.payload;
    },
    setCheckedCharacters: (state, action: PayloadAction<Character>) => {
      if (!Array.isArray(state.results)) {
        state.results = [];
      }
      const { id } = action.payload;

      const existingCharacter = state.results.find((char) => char.id === id);

      state.results = existingCharacter
        ? state.results.filter((char) => char.id !== id)
        : [...state.results, action.payload];
    },
    uncheckAllCharacters: (state) => {
      state.results = [];
    },
  },
  selectors: {
    selectCharacters: (state) => state,
  },
});

export const { setCharacters, setCheckedCharacters, uncheckAllCharacters } =
  charactersSlice.actions;

export const { selectCharacters } = charactersSlice.selectors;

export default charactersSlice.reducer;
