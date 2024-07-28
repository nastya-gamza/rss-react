import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types';

const initialState: Character[] = [];

const checkedCharactersSlice = createSlice({
  name: 'checkedCharacters',
  initialState,
  reducers: {
    setCheckedCharacters: (state, action: PayloadAction<Character>) => {
      const { id } = action.payload;
      const index = state.findIndex((char) => char.id === id);

      if (index === -1) {
        state.push(action.payload);
        return;
      }

      state.splice(index, 1);
    },
    uncheckAllCharacters: () => {
      return [];
    },
  },
  selectors: {
    checkedCharactersSelector: (state) => state,
  },
});

export const { setCheckedCharacters, uncheckAllCharacters } =
  checkedCharactersSlice.actions;
export const { checkedCharactersSelector } = checkedCharactersSlice.selectors;

export default checkedCharactersSlice.reducer;
