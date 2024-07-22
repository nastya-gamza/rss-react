import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types';

const initialState: Character[] = [];

const checkedCharactersSlice = createSlice({
  name: 'checkedCharacters',
  initialState,
  reducers: {
    setCheckedCharacters: (state, action: PayloadAction<Character>) => {
      const { id } = action.payload;

      const existingCharacter = state.find((char) => char.id === id);

      if (existingCharacter) {
        return state.filter((char) => char.id !== id);
      } else {
        state.push(action.payload);
      }
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
